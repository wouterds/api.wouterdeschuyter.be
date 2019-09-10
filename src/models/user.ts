import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

export interface Definition {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  salt: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

class User extends Model {}
User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    firstName: { type: DataTypes.STRING(32), allowNull: false },
    lastName: { type: DataTypes.STRING(32), allowNull: false },
    email: { type: DataTypes.STRING(64), allowNull: false },
    salt: { type: DataTypes.STRING(64), allowNull: false },
    password: { type: DataTypes.STRING(64), allowNull: false },
  },
  {
    sequelize,
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ['email'],
      },
    ],
  },
);

export default User;
