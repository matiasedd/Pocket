/* eslint-disable no-undef */
import { expect } from 'chai';
import { DeleteUserController } from '../../../../src/controllers/user/DeleteUser';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { UserRepositoryMock } from '../../../mocks/UserRepository';
import { ControllerValidatorMock } from '../../../../src/validators/Base';
import { usersMock, usersPasswordMock } from '../../../mocks/UserData';

describe('Controller: DeleteUser', () => {
  let userRepository: UserRepositoryMock;
  let deleteUserController: DeleteUserController;

  const httpRequestMock = {
    params: {
      userId: usersMock[0].id,
    },
  } as unknown as HttpRequest;

  context('Smoke Tests', () => {
    beforeEach(() => {
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      deleteUserController = new DeleteUserController(new ControllerValidatorMock(), userRepository);
    });

    it('should have a handler method', () => {
      expect(deleteUserController.handle).to.exist.which.be.a('function');
    });

    it('should have a user repository attribute', () => {
      expect(deleteUserController._getPrivateAttr('userRepository')).to.exist;
    });
  });

  describe('Method: handle', async () => {
    let usersAmount;
    let handle;

    before(async () => {
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      deleteUserController = new DeleteUserController(new ControllerValidatorMock(), userRepository);
      usersAmount = userRepository.usersMock.length;
      handle = await deleteUserController.handle(httpRequestMock);
    });

    it('should have soft deleted the user', () => {
      expect(userRepository.usersMock[0].softDelete).to.be.equal(true);
    });

    it('should return status 200 and a body with deleted true', () => {
      expect(handle).to.be.eql({
        statusCode: 200,
        body: true,
      });
    });
  });
});
