import BaseModel from '../models/Base';

export abstract class BaseRespository {
  abstract read(id: string): Promise<BaseModel>

  abstract insert(entity: BaseModel): Promise<BaseModel>

  abstract update(entity: BaseModel): Promise<BaseModel>

  abstract delete(entity: BaseModel): Promise<boolean>
}
