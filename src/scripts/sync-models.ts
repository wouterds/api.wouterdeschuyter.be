import 'bootstrap';
import { readdirSync } from 'fs';
import sequelize from 'services/sequelize';
import { resolve } from 'path';

if (process.env.NODE_ENV === 'production') {
  console.error("Unsafe application mode, don't sync models to database!");
  process.exit(1);
}

for (const file of readdirSync(resolve(__dirname, './../models'))) {
  require(`models/${file}`);
}

(async () => {
  try {
    await sequelize.sync({ alter: true });
    await sequelize.close();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
