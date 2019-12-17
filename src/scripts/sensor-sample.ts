import axios from 'axios';
import mean from 'lodash/mean';
import Sensor from 'models/sensor';

(async () => {
  const { data: sample1 } = await axios
    .get(`${process.env.SENSORS_API}`)
    .catch(() => process.exit(1));

  await new Promise(resolve => setTimeout(resolve, 15000));

  const { data: sample2 } = await axios
    .get(`${process.env.SENSORS_API}`)
    .catch(() => process.exit(1));

  await new Promise(resolve => setTimeout(resolve, 15000));

  const { data: sample3 } = await axios
    .get(`${process.env.SENSORS_API}`)
    .catch(() => process.exit(1));

  const data = {
    'illuminance:full': mean([
      sample1.illuminance.full,
      sample2.illuminance.full,
      sample3.illuminance.full,
    ]),
    'illuminance:visible': mean([
      sample1.illuminance.visible,
      sample2.illuminance.visible,
      sample3.illuminance.visible,
    ]),
    'illuminance:ir': mean([
      sample1.illuminance.ir,
      sample2.illuminance.ir,
      sample3.illuminance.ir,
    ]),
    temperature: mean([
      sample1.temperature,
      sample2.temperature,
      sample3.temperature,
    ]),
    humidity: mean([sample1.humidity, sample2.humidity, sample3.humidity]),
    pressure: mean([sample1.pressure, sample2.pressure, sample3.pressure]),
  };

  for (const [type, value] of Object.entries(data) as any) {
    await Sensor.create({ type, value });
  }

  process.exit(0);
})();
