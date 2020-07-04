import { decode as blurhashDecode } from 'blurhash';
import { createCanvas } from 'canvas';
import { basename } from 'path';
import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

import User from './user';

class MediaAsset extends Model {
  public id!: string;
  public userId!: string;
  public name!: string;
  public mediaType?: string;
  public size?: number;
  public width?: number;
  public height?: number;
  public md5?: string;
  public blurhash?: string;
  public path?: string;
  public url?: string;
  public readonly imagePreview?: string;
  public readonly fileName?: string;
}

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
    blurhash: { type: DataTypes.STRING(64), allowNull: true },
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
    imagePreview: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        const blurhash = this.getDataValue('blurhash');

        if (!blurhash) {
          return null;
        }

        const pixels = blurhashDecode(blurhash, 32, 32);
        const canvas = createCanvas(32, 32);

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          return null;
        }

        const imageData = ctx.createImageData(32, 32);
        if (!imageData) {
          return null;
        }

        imageData.data.set(pixels);
        ctx.putImageData(imageData, 0, 0);

        return canvas.toDataURL('image/jpeg');
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
