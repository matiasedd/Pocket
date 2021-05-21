import { HttpRequest } from '../protocols/HttpRequest';
import { HttpResponse } from '../protocols/HttpResponse';
import { BaseRespository } from '../repositories/Base';

export type ControllerValidator = (request: HttpRequest, repository?: BaseRespository) => Promise<HttpResponse>
