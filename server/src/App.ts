import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import routers from './routes';

export class PocketApp {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.loadRoutes();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  private loadRoutes(): void {
    routers.forEach((router) => {
      router.loadRoutes(this.app);
    });
  }
}
