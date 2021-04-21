// require("dotenv-safe").config();
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { PocketApp } from './App';

const PORT = process.env.PORT || 3000;
const WAIT = 1;

function main() {
  try {
    createConnection().then(async () => {
      const pocketApp = new PocketApp();
      await pocketApp.runSeeds();
      pocketApp.app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
      });
    });
  } catch (e) {
    console.log(e);
  }
}

console.log(`Server will start in ${WAIT} seconds...`);
setTimeout(main, WAIT * 1000);
