// require("dotenv-safe").config();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './App';

const PORT = process.env.PORT || 3333;
const WAIT = 1;

function main() {
  try {
    createConnection().then(() => app.listen(PORT, async () => {
      console.log(`Server running on port ${PORT}`);
    }));
  } catch (e) {
    console.log(e);
  }
}

console.log(`Server will start in ${WAIT} seconds...`);
setTimeout(main, WAIT * 1000);
