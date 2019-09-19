import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

class Media extends Model {}
Media.init(
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
    md5: { type: DataTypes.STRING(32), allowNull: true },
    path: { type: DataTypes.STRING(64), allowNull: true },
    url: { type: DataTypes.STRING(64), allowNull: true },
    mediaType: { type: DataTypes.STRING(16), allowNull: true },
    size: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize,
    tableName: 'media',
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
  }
);

export default Media;
