import 'reflect-metadata';
import { PocketApp } from './App';

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const WAIT = 2; // Tempo de esperar para iniciar o servidor

function main() {
  try {
    const pocketApp = new PocketApp();
    pocketApp.app.listen(PORT, async () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

console.log(`Server will start in ${WAIT} seconds...`);
setTimeout(main, WAIT * 1000);
