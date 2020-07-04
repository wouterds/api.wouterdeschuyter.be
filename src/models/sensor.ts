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

class Sensor extends Model {
  public id!: string;
  public type!: SensorType;
  public value!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Sensor.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM(
        SensorType.IlluminanceFull,
        SensorType.IlluminanceVisible,
        SensorType.IlluminanceIr,
        SensorType.Temperature,
        SensorType.Humidity,
        SensorType.Pressure,
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
