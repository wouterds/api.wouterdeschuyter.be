import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

export enum AccessTokenType {
  Spotify = 'spotify',
}

class AccessToken extends Model {
  public id!: string;
  public type!: AccessTokenType;
  public accessToken!: string;
  public refreshToken!: string;
  public expiresAt?: string;
}

AccessToken.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(AccessTokenType.Spotify),
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
      {
        fields: ['refreshToken'],
      },
    ],
  },
);

export default AccessToken;
