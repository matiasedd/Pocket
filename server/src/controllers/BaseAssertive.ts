import { HttpRequest } from '../protocols/HttpRequest';
import { ErrorHttpResponse, HttpResponse } from '../protocols/HttpResponse';
import { ControllerValidator } from '../validators/Base';
import { BaseController } from './Base';

export abstract class BaseAssertiveController extends BaseController {
  constructor(validator: ControllerValidator) {
    super();
    this.validator = validator;
  }

  public validator: ControllerValidator
}
