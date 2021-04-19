import { Request, Response } from 'express';

export async function auth(request: Request, response: Response, next: Function) {
  if (!!request && !!response) {
    next();
  }
}
