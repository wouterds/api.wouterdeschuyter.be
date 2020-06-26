import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

import Post from './post';

class PostAlias extends Model {}
PostAlias.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    postId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    slug: { type: DataTypes.STRING(191), allowNull: false },
  },
  {
    sequelize,
    tableName: 'post-aliases',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['postId'],
      },
      {
        fields: ['slug'],
      },
    ],
  },
);

PostAlias.belongsTo(Post, { as: 'post', constraints: false });

export default PostAlias;
