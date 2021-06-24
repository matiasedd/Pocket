/* eslint-disable no-undef */
import { expect } from 'chai';
import { UpdateUserController } from '../../../../src/controllers/user/UpdateUser';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { UserRepositoryMock } from '../../../mocks/UserRepository';
import { usersMock, usersPasswordMock } from '../../../mocks/UserData';
import { ControllerValidatorMock } from '../../../../src/validators/Base';

describe('Controller: UpdateTransaction', () => {
  let userRepository: UserRepositoryMock;
  let updateUserController: UpdateUserController;

  const httpRequestMock = {
    body: {
      firstName: 'Paul',
      lastName: 'McCartney',
      email: 'paul.mccartney@thebeatles.com',
    },
    params: {
      userId: usersMock[0].id,
    },
  } as unknown as HttpRequest;

  context('Smoke Tests', () => {
    beforeEach(() => {
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      updateUserController = new UpdateUserController(new ControllerValidatorMock(), userRepository);
    });

    it('should have a handler method', () => {
      expect(updateUserController.handle).to.exist.which.be.a('function');
    });

    it('should have a user repository attribute', () => {
      expect(updateUserController._getPrivateAttr('userRepository')).to.exist;
    });
  });

  describe('Method: handle', async () => {
    let handle;

    before(async () => {
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      updateUserController = new UpdateUserController(new ControllerValidatorMock(), userRepository);
      handle = await updateUserController.handle(httpRequestMock);
    });

    it('should have updated the user', () => {
      Object.keys(httpRequestMock.body).map((key) => {
        expect(userRepository.usersMock[0][key]).to.exist.which.be.equal(httpRequestMock.body[key]);
        return null;
      });
    });

    it('should return status 200 and the updated user on body', () => {
      expect(handle.statusCode).to.be.equal(200);
      Object.keys(httpRequestMock.body).map((key) => {
        expect(handle.body[key]).to.be.equal(httpRequestMock.body[key]);
        return null;
      });
    });
  });
});
