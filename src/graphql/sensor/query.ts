import axios from 'axios';

const fetchData = async (): Promise<Array<{ id: string; value: number }>> => {
  const data: any = {};

  try {
    const { data: response } = await axios.get(
      `${process.env.ENDPOINT_SENSORS}`
    );

    data.temperature = response.temperature;
    data.humidity = response.humidity;
    data.pressure = response.pressure;
    data['illuminance:ir'] = response.illuminance.ir;
    data['illuminance:visible'] = response.illuminance.visible;
    data['illuminance:full'] = response.illuminance.full;
  } catch {}

  return data;
};

export default {};
