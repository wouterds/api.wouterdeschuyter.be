import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

export enum UserStatus {
  Active = 'ACTIVE',
  NotActive = 'NOT_ACTIVE',
  Deleted = 'DELETED',
}

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING(64), allowNull: false },
    email: { type: DataTypes.STRING(64), allowNull: false },
    status: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        if (this.getDataValue('deletedAt')) {
          return UserStatus.Deleted;
        }

        if (!this.getDataValue('activatedAt')) {
          return UserStatus.NotActive;
        }

        return UserStatus.Active;
      },
    },
    lastOnlineAt: { type: DataTypes.DATE, allowNull: true },
    activatedAt: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'users',
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
