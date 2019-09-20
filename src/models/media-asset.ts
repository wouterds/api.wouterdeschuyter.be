import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

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
    name: { type: DataTypes.STRING(64), allowNull: false },
    mediaType: { type: DataTypes.STRING(16), allowNull: true },
    size: { type: DataTypes.INTEGER, allowNull: true },
    md5: { type: DataTypes.STRING(32), allowNull: true },
    path: { type: DataTypes.STRING(64), allowNull: true },
    url: { type: DataTypes.STRING(64), allowNull: true },
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

export default MediaAsset;
