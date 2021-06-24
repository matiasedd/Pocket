/* eslint-disable consistent-return */
import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { HttpRequest } from '../protocols/HttpRequest';

export async function auth(request: HttpRequest, response: Response, next: Function) {
  const token = request.headers['x-access-token'] as string;
  if (!token) return response.status(401).send('Token inválido');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded: { id }) => {
    if (err) {
      response.status(401).send('Token inválido');
    }
    request.requesterId = decoded.id;
    next();
  });
}
