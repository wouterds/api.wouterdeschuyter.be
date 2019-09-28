import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';
import User from './user';

class Post extends Model {}
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
    mediaId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: { type: DataTypes.STRING(191), allowNull: false },
    slug: { type: DataTypes.STRING(191), allowNull: false },
    excerpt: { type: DataTypes.TEXT, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    publishedAt: { type: DataTypes.DATE, allowNull: true },
    views: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    status: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        if (this.getDataValue('deletedAt')) {
          return 'DELETED';
        }

        if (!this.getDataValue('publishedAt')) {
          return 'DRAFT';
        }

        return 'PUBLISHED';
      },
    },
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
        fields: ['mediaId'],
      },
    ],
  },
);

Post.belongsTo(User, { as: 'user' });

export default Post;
