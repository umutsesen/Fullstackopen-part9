/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
import diagnoseService from './src/routes/diaries';
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cors = require('cors');

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

const PORT = 3001;

app.get('/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});
app.use('/api', diagnoseService);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});