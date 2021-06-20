/* eslint-disable no-undef */
import { expect } from 'chai';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { UserRepositoryMock } from '../../../mocks/UserRepository';
import { DeleteUserValidator } from '../../../../src/validators/users/DeleteUser';
import { UserRepository } from '../../../../src/repositories/User';
import { usersMock, usersPasswordMock } from '../../../mocks/UserData';

describe('Validator: DeleteUserValidator', () => {
  let httpRequest: HttpRequest;
  let validator: DeleteUserValidator;
  let validate: HttpRequest;
  let userRepository: UserRepository;

  beforeEach(async () => {
    userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
    validator = new DeleteUserValidator(userRepository);
  });

  it('should return an empty body and status 200 when the user exists and the requester gets data from himself', async () => {
    httpRequest = {
      body: {},
      params: {
        userId: usersMock[0].id,
      },
      requesterId: usersMock[0].id,
    } as unknown as HttpRequest;
    validate = await validator.validate(httpRequest) as HttpRequest;
    expect(validate).to.be.eql({
      body: {},
      statusCode: 200,
    });
  });

  it("should return status 404 and a body with message 'Usuário não encontrado'when the user does not exist", async () => {
    httpRequest = {
      body: {},
      params: {
        userId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
      },
      requesterId: usersMock[0].id,
    } as unknown as HttpRequest;
    validate = await validator.validate(httpRequest) as HttpRequest;
    expect(validate).to.be.eql({
      body: 'Usuário não encontrado',
      statusCode: 404,
    });
  });

  it("should return status 401 and a body with message 'Usuário não é dono do recurso' when the requester tries to get data from a different user", async () => {
    httpRequest = {
      body: {},
      params: {
        userId: usersMock[0].id,
      },
      requesterId: usersMock[1].id,
    } as unknown as HttpRequest;
    validate = await validator.validate(httpRequest) as HttpRequest;
    expect(validate).to.be.eql({
      body: 'Usuário não é dono do recurso',
      statusCode: 401,
    });
  });
});
