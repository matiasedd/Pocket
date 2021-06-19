/* eslint-disable no-undef */
import { expect } from 'chai';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { UserRepositoryMock } from '../../mocks/UserRepository';
import { GetUserValidator } from '../../../src/validators/users/GetUser';
import { UserRepository } from '../../../src/repositories/User';
import { usersMock, usersPasswordMock } from '../../mocks/UserData';

describe('Validator: GetUserValidator', () => {
  let httpRequest: HttpRequest;
  let validator: GetUserValidator;
  let validate: HttpRequest;
  let userRepository: UserRepository;

  beforeEach(async () => {
    userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
    validator = new GetUserValidator(userRepository);
  });

  it('should return an empty body when the user exists and the requester gets data from himself', async () => {
    httpRequest = {
      body: {},
      params: {
        userId: usersMock[0].id,
      },
      requesterId: usersMock[0].id,
    } as unknown as HttpRequest;
    validate = await validator.validate(httpRequest) as HttpRequest;
    expect(validate.body).to.be.eql({});
  });

  it('should return statusCode 200 when the user exists and the requester gets data from himself', async () => {
    httpRequest = {
      body: {},
      params: {
        userId: usersMock[0].id,
      },
      requesterId: usersMock[0].id,
    } as unknown as HttpRequest;
    validate = await validator.validate(httpRequest) as HttpRequest;
    expect(validate.statusCode).to.be.equal(200);
  });

  it("should return a body with message 'Usuário não encontrado' when the user does not exist", async () => {
    httpRequest = {
      body: {},
      params: {
        userId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
      },
      requesterId: usersMock[0].id,
    } as unknown as HttpRequest;
    validate = await validator.validate(httpRequest) as HttpRequest;
    expect(validate.body).to.be.equal('Usuário não encontrado');
  });

  it('should return statusCode 404 when the user does not exist', async () => {
    httpRequest = {
      body: {},
      params: {
        userId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
      },
      requesterId: usersMock[0].id,
    } as unknown as HttpRequest;
    validate = await validator.validate(httpRequest) as HttpRequest;
    expect(validate.statusCode).to.be.equal(404);
  });

  it("should return a body with message 'Usuário não é dono do recurso' when the requester tries to get data from a different user", async () => {
    httpRequest = {
      body: {},
      params: {
        userId: usersMock[0].id,
      },
      requesterId: usersMock[1].id,
    } as unknown as HttpRequest;
    validate = await validator.validate(httpRequest) as HttpRequest;
    expect(validate.body).to.be.equal('Usuário não é dono do recurso');
  });

  it('should return statusCode 401 when the user does not exist', async () => {
    httpRequest = {
      body: {},
      params: {
        userId: usersMock[0].id,
      },
      requesterId: usersMock[1].id,
    } as unknown as HttpRequest;
    validate = await validator.validate(httpRequest) as HttpRequest;
    expect(validate.statusCode).to.be.equal(401);
  });
});
