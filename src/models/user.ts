import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    firstName: { type: DataTypes.STRING(32), allowNull: false },
    lastName: { type: DataTypes.STRING(32), allowNull: false },
    email: { type: DataTypes.STRING(64), allowNull: false },
    salt: { type: DataTypes.STRING(64), allowNull: false },
    password: { type: DataTypes.STRING(64), allowNull: false },
    status: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        if (this.getDataValue('deletedAt')) {
          return 'DELETED';
        }

        if (!this.getDataValue('activatedAt')) {
          return 'NOT_ACTIVATED';
        }

        return 'ACTIVE';
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
