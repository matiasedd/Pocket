/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
import { HttpRequest } from '../protocols/HttpRequest';
import { ErrorHttpResponse, HttpResponse } from '../protocols/HttpResponse';

export abstract class BaseController {
  abstract handle(request?: HttpRequest): Promise<HttpResponse>

  /**
   * Retorna uma propriedade private. É utilizada nos testes.
   * @param attr
   * @returns
   */
  _getPrivateAttr(attr: string): any {
    return this[attr];
  }
}
