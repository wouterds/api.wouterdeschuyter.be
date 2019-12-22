import axios from 'axios';
import qs from 'qs';

(async () => {
  const { data } = await axios({
    method: 'GET',
    url: `${process.env.SENSORS_API}/illuminance/full`,
  }).catch(() => process.exit(1));

  await axios({
    method: 'POST',
    url: `${process.env.SENSORS_API}/led`,
    data: qs.stringify({
      enabled: data > 5 ? 1 : 0,
    }),
  }).catch(() => process.exit(1));

  process.exit(0);
})();
