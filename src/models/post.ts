import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

import MediaAsset from './media-asset';
import User from './user';

export enum PostStatus {
  Published = 'published',
  Draft = 'draft',
  Deleted = 'deleted',
}

class Post extends Model {
  public id!: string;
  public userId!: string;
  public mediaAssetId!: string;
  public title!: string;
  public slug!: string;
  public excerpt!: string;
  public body!: string;
  public views!: number;
  public readonly status!: PostStatus;
  public publishedAt!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt?: Date | null;
}

Post.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    mediaAssetId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: { type: DataTypes.STRING(191), allowNull: false },
    slug: { type: DataTypes.STRING(191), allowNull: false },
    excerpt: { type: DataTypes.TEXT, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    views: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    status: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        if (this.getDataValue('deletedAt')) {
          return PostStatus.Deleted;
        }

        if (!this.getDataValue('publishedAt')) {
          return PostStatus.Draft;
        }

        return PostStatus.Published;
      },
    },
    publishedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'posts',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['mediaAssetId'],
      },
    ],
  },
);

Post.belongsTo(User, { as: 'user', constraints: false });
Post.belongsTo(MediaAsset, { as: 'mediaAsset', constraints: false });

export default Post;
