import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

class AccessToken extends Model {}
AccessToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM('spotify'),
      allowNull: false,
    },
    accessToken: { type: DataTypes.STRING, allowNull: false },
    refreshToken: { type: DataTypes.STRING, allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
  },
  {
    sequelize,
    tableName: 'access-tokens',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        fields: ['type'],
      },
    ],
  },
);

export default AccessToken;
