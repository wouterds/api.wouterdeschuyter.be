import { basename } from 'path';
import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

import User from './user';

class MediaAsset extends Model {}
MediaAsset.init(
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
    name: { type: DataTypes.STRING(128), allowNull: false },
    mediaType: { type: DataTypes.STRING(16), allowNull: true },
    size: { type: DataTypes.INTEGER, allowNull: true },
    width: { type: DataTypes.INTEGER, allowNull: true },
    height: { type: DataTypes.INTEGER, allowNull: true },
    md5: { type: DataTypes.STRING(32), allowNull: true },
    path: { type: DataTypes.STRING(64), allowNull: true },
    url: { type: DataTypes.STRING(64), allowNull: true },
    fileName: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        const path = this.getDataValue('path');

        if (!path) {
          return null;
        }

        return basename(path);
      },
    },
  },
  {
    sequelize,
    tableName: 'media-assets',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['userId'],
      },
      {
        fields: ['md5'],
      },
      {
        fields: ['url'],
      },
    ],
  },
);

MediaAsset.belongsTo(User, { as: 'user', constraints: false });

export default MediaAsset;
