/* eslint-disable max-len */
/* eslint-disable no-undef */
import { expect } from 'chai';
import { GetUserController } from '../../../../src/controllers/user/GetUser';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { UserRepositoryMock } from '../../../mocks/UserRepository';
import { usersMock, usersPasswordMock } from '../../../mocks/UserData';
import { UserRepository } from '../../../../src/repositories/User';
import { HttpResponse } from '../../../../src/protocols/HttpResponse';
import { ControllerValidatorMock } from '../../../../src/validators/Base';

describe('Controller: GetUser', () => {
  let userRepository: UserRepository;
  let getUserController: GetUserController;
  const httpRequestMock = {
    body: {},
    params: {
      userId: usersMock[0].id,
    },
  } as unknown as HttpRequest;

  context('Smoke Tests', () => {
    beforeEach(() => {
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      getUserController = new GetUserController(new ControllerValidatorMock(), userRepository);
    });

    it('should have a handler method', () => {
      expect(getUserController.handle).to.exist.which.be.a('function');
    });

    it('should have a user repository attribute', () => {
      expect(getUserController._getPrivateAttr('userRepository')).to.exist;
    });
  });

  describe('Method: handle', () => {
    let handle: HttpResponse;
    before(async () => {
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      getUserController = new GetUserController(new ControllerValidatorMock(), userRepository);
      handle = await getUserController.handle(httpRequestMock);
    });

    it('should return status 200 and the user on body', () => {
      expect(handle).to.be.eql({
        statusCode: 200,
        body: usersMock[0],
      });
    });
  });
});
