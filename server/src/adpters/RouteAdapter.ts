import { Request, Response } from 'express';
import { BaseController } from '../controllers/Base';
import { HttpRequest } from '../protocols/HttpRequest';
import { ErrorHttpResponse, HttpResponse } from '../protocols/HttpResponse';

export const makeRoute = (controller: BaseController) => (
  async (request: Request, response: Response) => {
    let validate = <ErrorHttpResponse>{};
    let handle = <HttpResponse>{};
    try {
      validate = await controller.validate(request as HttpRequest);
    } catch (error) {
      console.log(error);
      response.status(500).send(error);
    }
    if (validate.statusCode >= 200 && validate.statusCode < 299) {
      try {
        handle = await controller.handle(request);
      } catch (error) {
        response.status(500).send(error);
      }
      response.status(handle.statusCode).send(handle.body);
    } else {
      response.status(validate.statusCode).send(validate.body);
    }
  }
);
