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
    value: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    tableName: 'access-tokens',
    timestamps: true,
    indexes: [
      {
        fields: ['type'],
      },
    ],
  },
);

export default AccessToken;
