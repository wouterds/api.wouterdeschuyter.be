import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

class Media extends Model {}
Media.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    userId: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, allowNull: false },
    name: { type: DataTypes.STRING(64), allowNull: false },
    url: { type: DataTypes.STRING(64), allowNull: true },
    contentType: { type: DataTypes.STRING(32), allowNull: true },
    size: { type: DataTypes.INTEGER, allowNull: true },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['userId'],
      },
    ],
  },
);

export default Media;
