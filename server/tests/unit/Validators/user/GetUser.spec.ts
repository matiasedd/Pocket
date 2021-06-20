/* eslint-disable no-undef */
import { expect } from 'chai';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { UserRepositoryMock } from '../../../mocks/UserRepository';
import { GetUserValidator } from '../../../../src/validators/users/GetUser';
import { UserRepository } from '../../../../src/repositories/User';
import { usersMock, usersPasswordMock } from '../../../mocks/UserData';

describe('Validator: GetUserValidator', () => {
  let httpRequest: HttpRequest;
  let validator: GetUserValidator;
  let validate: HttpRequest;
  let userRepository: UserRepository;

  beforeEach(async () => {
    userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
    validator = new GetUserValidator(userRepository);
  });

  it('should return status 200 and an empty body when the user exists and the requester gets data from himself', async () => {
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

  it("should return status 404 and a body with message 'Usuário não encontrado' when the user does not exist", async () => {
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
