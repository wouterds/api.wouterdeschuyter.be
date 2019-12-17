import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

class Sensor extends Model {}
Sensor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(
        'illuminance:full',
        'illuminance:visible',
        'illuminance:ir',
        'temperature',
        'humidity',
        'pressure',
      ),
      allowNull: false,
    },
    value: { type: DataTypes.FLOAT(8, 2), allowNull: false },
  },
  {
    sequelize,
    tableName: 'sensors',
    timestamps: true,
    indexes: [
      {
        fields: ['type'],
      },
    ],
  },
);

export default Sensor;
