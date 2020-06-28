import { DataTypes, Model } from 'sequelize';
import sequelize from 'services/sequelize';

export enum SensorType {
  IlluminanceFull = 'illuminance:full',
  IlluminanceVisible = 'illuminance:visible',
  IlluminanceIr = 'illuminance:ir',
  Temperature = 'temperature',
  Humidity = 'humidity',
  Pressure = 'pressure',
}

export interface SensorDefition {
  id: string;
  type: SensorType;
  value: number;
}

class Sensor extends Model<SensorDefition> {}
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
