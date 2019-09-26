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
    activatedAt: { type: DataTypes.DATE, allowNull: true },
    status: {
      type: DataTypes.VIRTUAL,
      get(this: any) {
        const activatedAt = this.getDataValue('activatedAt');

        if (!activatedAt) {
          return 'INACTIVE';
        }

        if (new Date(activatedAt) < new Date()) {
          return 'ACTIVE';
        }

        return 'INACTIVE';
      },
    },
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
