import { Request } from 'express';

interface HttpRequest extends Request {
  body: any
}

export { HttpRequest };
