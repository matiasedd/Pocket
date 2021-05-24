/* eslint-disable no-unused-vars */
import { HttpRequest } from '../protocols/HttpRequest';
import { ErrorHttpResponse, HttpResponse } from '../protocols/HttpResponse';

export abstract class BaseController {
  abstract handle(request?: HttpRequest): Promise<HttpResponse>
}
