import axios from 'axios';

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
  for (const [sensor, value] of Object.entries(data) as any) {
    sensors.push({ id: sensor, value });
  }

  return sensors;
};

const sensors = (_parent: any, args: { live?: boolean }) => {
  const { live = false } = args;

  if (live) {
    return fetchAll();
  }

  return {};
};

const sensor = async (_parent: any, args: { id: string; live?: boolean }) => {
  const { id, live = false } = args;

  if (live) {
    const sensors = await fetchAll();
    const filtered = sensors.filter(sensor => sensor.id === id);

    if (filtered.length > 0) {
      return filtered[0];
    }

    return null;
  }

  return null;
};

export default {
  sensors,
  sensor,
};
