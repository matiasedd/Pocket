import { HttpRequest } from '../protocols/HttpRequest';
import { ErrorHttpResponse, HttpResponse } from '../protocols/HttpResponse';
import { BaseController } from './Base';

type Validator = (par: HttpRequest) => Promise<HttpResponse | ErrorHttpResponse>

export abstract class BaseAssertiveController extends BaseController {
  constructor(validator: Validator) {
    super();
    this.validator = validator;
  }

  private validator: Validator

  async validate(request: HttpRequest): Promise<HttpResponse | ErrorHttpResponse> {
    const validation = await this.validator(request);
    return validation;
  }
}
