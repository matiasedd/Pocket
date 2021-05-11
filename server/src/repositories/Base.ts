import { BaseViewModel } from '../models/Base';

export abstract class BaseRespository {
  abstract read(id: string): Promise<BaseViewModel>

  abstract insert(entity: any): Promise<BaseViewModel>

  abstract update(entity: any): Promise<BaseViewModel>

  abstract delete(entity: any): Promise<boolean>
}
