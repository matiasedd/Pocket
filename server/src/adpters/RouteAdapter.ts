import { Request, Response } from 'express';
import { BaseController } from '../controllers/Base';
import { BaseAssertiveController } from '../controllers/BaseAssertive';
import { HttpRequest } from '../protocols/HttpRequest';
import { ErrorHttpResponse, HttpResponse } from '../protocols/HttpResponse';

/* Importante: os blocos try/catch visam capturar erros inesperados,
não relacionados ao validator da controller */

export const makeRoute = (controller: BaseController) => (
  async (request: Request, response: Response) => {
    let validate = <ErrorHttpResponse>{};
    let handle = <HttpResponse>{};
    // Realiza a validação caso a controller seja assertive
    if (controller instanceof BaseAssertiveController) {
      try {
        validate = await controller.validate(request as HttpRequest);
      } catch (error) {
        console.log(error);
        response.status(500).send(error);
      }
    } else {
      validate = {
        statusCode: 200,
        body: {
          message: '',
        },
      };
    }
    // Após a validação, executa o método handle da controller
    if (validate.statusCode >= 200 && validate.statusCode < 299) {
      request.body = { ...request.body, ...validate.body };
      try {
        handle = await controller.handle(request);
      } catch (error) {
        console.log(error);
        response.status(500).send(error);
      }
      response.status(handle.statusCode).send(handle.body);
    } else {
      response.status(validate.statusCode).send(validate.body);
    }
  }
);
