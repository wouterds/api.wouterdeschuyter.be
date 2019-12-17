import axios from 'axios';
import Sensor from 'models/sensor';

const fetchAll = async () => {
  const data: any = {};

  try {
    const { data: response } = await axios.get(`${process.env.SENSORS_API}`);

    data.temperature = response.temperature;
    data.humidity = response.humidity;
    data.pressure = response.pressure;
    data['illuminance:ir'] = response.illuminance.ir;
    data['illuminance:visible'] = response.illuminance.visible;
    data['illuminance:full'] = response.illuminance.full;
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
    const filtered = sensors.filter(sensor => sensor.type === type);

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

export default {
  sensors,
  sensor,
};
