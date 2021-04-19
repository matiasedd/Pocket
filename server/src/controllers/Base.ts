/* eslint-disable no-unused-vars */
import { HttpRequest } from '../protocols/HttpRequest';
import { ErrorHttpResponse, HttpResponse } from '../protocols/HttpResponse';

type Validator = (par: HttpRequest) => Promise<HttpResponse | ErrorHttpResponse>

export abstract class BaseController {
  constructor(validator: Validator) {
    this.validator = validator;
  }

  private validator: Validator

  async validate(request: HttpRequest): Promise<HttpResponse | ErrorHttpResponse> {
    const validation = await this.validator(request);
    return validation;
  }

  abstract handle(request: HttpRequest): Promise<HttpResponse>
}
