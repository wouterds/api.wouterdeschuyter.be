import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

class AuthenticationRequest extends Model {
  public token!: string;
  public userId!: string;
  public userAgent!: string;
  public ip!: string;
  public consumedAt?: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AuthenticationRequest.init(
  {
    token: { type: DataTypes.STRING(64), primaryKey: true },
    userId: { type: DataTypes.UUID, allowNull: false },
    userAgent: { type: DataTypes.STRING(256), allowNull: false },
    ip: { type: DataTypes.STRING(64), allowNull: false },
    consumedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'authentication-requests',
    timestamps: true,
    indexes: [
      {
        fields: ['userId'],
      },
    ],
  },
);

export default AuthenticationRequest;
