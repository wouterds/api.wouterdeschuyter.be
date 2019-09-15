import axios from 'axios';

const fetchAll = async (): Promise<Array<{ id: string; value: number }>> => {
  const data: any = {};

  try {
    const { data: response } = await axios.get(
      'https://sensors.wouterdeschuyter.be'
    );

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

const sensors = () => {
  return fetchAll();
};

const sensor = async (_: any, args: { id: string }) => {
  const { id } = args;

  const sensors = await fetchAll();
  const filtered = sensors.filter(sensor => sensor.id === id);

  if (filtered.length > 0) {
    return filtered[0];
  }

  return null;
};

export default {
  sensors,
  sensor,
};
