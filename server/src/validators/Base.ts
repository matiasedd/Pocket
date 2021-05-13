import { HttpRequest } from '../protocols/HttpRequest';
import { HttpResponse } from '../protocols/HttpResponse';

export type ControllerValidator = (request: HttpRequest) => Promise<HttpResponse>
