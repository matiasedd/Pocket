/* eslint-disable no-undef */
import { expect } from 'chai';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { UserRepositoryMock } from '../../mocks/UserRepository';
import { UpdateUserValidator } from '../../../src/validators/users/UpdateUser';
import { UserRepository } from '../../../src/repositories/User';
import { usersMock, usersPasswordMock } from '../../mocks/UserData';

describe('Validator: UpdateUserValidator', () => {
  let httpRequest: HttpRequest;
  let validator: UpdateUserValidator;
  let validate: HttpRequest;
  let userRepository: UserRepository;

  context('User data is valid', () => {
    beforeEach(async () => {
      httpRequest = {
        body: {},
        params: {
          userId: usersMock[0].id,
        },
        userId: usersMock[0].id,
      } as unknown as HttpRequest;
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      validator = new UpdateUserValidator(userRepository);
      validate = await validator.validate(httpRequest) as HttpRequest;
    });

    it('should return an empty body and status 200', () => {
      expect(validate).to.be.eql({
        body: {},
        statusCode: 200,
      });
    });
  });

  context('User data is not valid', () => {
    beforeEach(async () => {
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      validator = new UpdateUserValidator(userRepository);
    });

    it("should return status 404 and a body with message 'Usuário não encontrado' when user does not exist", async () => {
      httpRequest = {
        body: {},
        params: {
          userId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
        },
        userId: usersMock[0].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.eql({
        body: 'Usuário não encontrado',
        statusCode: 404,
      });
    });

    it("should have a body with message 'Usuário não é dono do recurso' when user tries to update a different user", async () => {
      httpRequest = {
        body: {},
        params: {
          userId: usersMock[1].id,
        },
        userId: usersMock[0].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.eql({
        body: 'Usuário não é dono do recurso',
        statusCode: 401,
      });
    });
  });
});
