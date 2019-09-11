import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

class Post extends Model {}
Post.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false },
    mediaId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false },
    title: { type: DataTypes.STRING(191), allowNull: false },
    slug: { type: DataTypes.STRING(191), allowNull: false },
    excerpt: { type: DataTypes.TEXT, allowNull: false },
    body: { type: DataTypes.TEXT, allowNull: false },
    publishedAt: { type: DataTypes.DATE, allowNull: true },
    views: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
  },
  {
    sequelize,
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

export default Post;
