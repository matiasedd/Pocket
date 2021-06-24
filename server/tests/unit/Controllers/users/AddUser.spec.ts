/* eslint-disable max-len */
/* eslint-disable no-undef */
import { expect } from 'chai';
import { AddUserController } from '../../../../src/controllers/user/AddUser';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { UserRepositoryMock } from '../../../mocks/UserRepository';
import { usersMock, usersPasswordMock } from '../../../mocks/UserData';
import { ControllerValidatorMock } from '../../../../src/validators/Base';

describe('Controller: AddTransaction', () => {
  let userRepository: UserRepositoryMock;
  let addUserController: AddUserController;

  const httpRequestMock = {
    body: {
      firstName: 'Billy',
      lastName: 'Idol',
      email: 'billy.idol@hitmail.com',
      password: 'eyeswithoutaface',
    },
  } as unknown as HttpRequest;

  context('Smoke Tests', () => {
    beforeEach(() => {
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      addUserController = new AddUserController(new ControllerValidatorMock(), userRepository);
    });

    it('should have a handler method', () => {
      expect(addUserController.handle).to.exist.which.be.a('function');
    });

    it('should have a user repository attribute', () => {
      expect(addUserController._getPrivateAttr('userRepository')).to.exist;
    });
  });

  context('Method: handle', async () => {
    let usersAmount: number;
    let handle;

    before(async () => {
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      addUserController = new AddUserController(new ControllerValidatorMock(), userRepository);
      usersAmount = usersMock.length;
      handle = await addUserController.handle(httpRequestMock);
    });

    it('should have created the user', () => {
      expect(userRepository.usersMock.length).to.be.equal(usersAmount + 1);
    });

    it('should have created the password', () => {
      expect(userRepository.usersPasswordMock.length).to.be.equal(usersAmount + 1);
    });

    it('should return status 200 and the created user on body', () => {
      expect(handle.statusCode).to.be.equal(200);
      Object.keys(httpRequestMock.body).map((key) => {
        // A senha nunca vai vir no objeto do user, portanto não verificamos ela
        if (key !== 'password') {
          expect(handle.body[key]).to.be.equal(httpRequestMock.body[key]);
        }
        return null;
      });
    });
  });
});
