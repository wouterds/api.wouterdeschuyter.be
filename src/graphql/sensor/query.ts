import axios from 'axios';
import Sensor, { SensorType } from 'models/sensor';

const fetchAll = async () => {
  const data: any = {};

  try {
    const { data: response } = await axios.get(`${process.env.SENSORS_API}`);

    data[SensorType.Temperature] = response.temperature;
    data[SensorType.Humidity] = response.humidity;
    data[SensorType.Pressure] = response.pressure;
    data[SensorType.IlluminanceIr] = response.illuminance.ir;
    data[SensorType.IlluminanceVisible] = response.illuminance.visible;
    data[SensorType.IlluminanceFull] = response.illuminance.full;
  } catch {}

  const sensors = [];
  for (const [type, value] of Object.entries(data) as any) {
    sensors.push({ type, value });
  }

  return sensors;
};

const sensors = async (_parent: any, args: { live?: boolean }) => {
  const { live = true } = args;

  if (live) {
    return fetchAll();
  }

  const sensorCount = await Sensor.count({ distinct: true, col: 'type' });

  return Sensor.findAll({
    order: [['createdAt', 'desc']],
    limit: sensorCount,
  });
};

const sensor = async (_parent: any, args: { type: string; live?: boolean }) => {
  const { type, live = true } = args;

  if (live) {
    const sensors = await fetchAll();
    const filtered = sensors.filter((sensor) => sensor.type === type);

    if (filtered.length > 0) {
      return filtered[0];
    }

    return null;
  }

  return Sensor.findOne({
    where: { type },
    order: [['createdAt', 'desc']],
  });
};

const sensorHistory = async (
  _parent: any,
  args: { type: string; start: string; end: string },
) => {
  const { type, start, end } = args;
  const startDate = new Date(start);
  const endDate = new Date(end);

  console.log({ type, startDate, endDate });

  return { type, data: [] };
};

export default {
  sensors,
  sensor,
  sensorHistory,
};
