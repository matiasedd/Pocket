import { HttpRequest } from '../protocols/HttpRequest';
import { ErrorHttpResponse, HttpResponse } from '../protocols/HttpResponse';
import { ControllerValidator } from '../validators/Base';
import { BaseController } from './Base';

export abstract class BaseAssertiveController extends BaseController {
  constructor(validator: ControllerValidator) {
    super();
    this.validator = validator;
  }

  private validator: ControllerValidator

  async validate(request?: HttpRequest): Promise<HttpResponse | ErrorHttpResponse> {
    const validation = await this.validator(request);
    return validation;
  }
}
