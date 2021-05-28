import { Request } from 'express';

interface HttpRequest extends Request {
  body: any
  [key: string]: any
}

export { HttpRequest };
