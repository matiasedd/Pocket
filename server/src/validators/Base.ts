import { HttpRequest } from '../protocols/HttpRequest';
import { HttpResponse } from '../protocols/HttpResponse';
import { BaseRespository } from '../repositories/Base';

export class ControllerValidator {
  public async validate(request: HttpRequest): Promise<HttpResponse> {
    return {
      statusCode: 200,
      body: {},
    };
  }
}
