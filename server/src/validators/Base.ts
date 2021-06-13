/* eslint-disable max-classes-per-file */
import { HttpRequest } from '../protocols/HttpRequest';
import { HttpResponse } from '../protocols/HttpResponse';

export class ControllerValidator {
  public async validate(request: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {},
    };
  }
}

/**
 * Um mock da classe ControllerValidator que sempre retorna a response passada
 * no construtor. A finaldiade é ser usado nos testes para evitar o uso de
 * validators concretos.
 */
export class ControllerValidatorMock extends ControllerValidator {
  public async validate(request: HttpRequest): Promise<HttpResponse> {
    return Promise.resolve(request as HttpResponse);
  }
}
