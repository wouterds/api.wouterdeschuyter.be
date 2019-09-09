import express from 'express';

const app = express();

app.get('/', (_req, res) => res.send('Hello World!'));

app.listen(3000, () => {
  console.log('> Application is running on http://localhost:3000 🚀');
});
