import { Application } from 'express';

export interface BaseRouter {
  loadRoutes: (app: Application) => void
}
