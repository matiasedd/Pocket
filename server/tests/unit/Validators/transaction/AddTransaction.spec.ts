/* eslint-disable no-undef */
import { expect } from 'chai';
import { HttpRequest } from '../../../../src/protocols/HttpRequest';
import { UserRepository } from '../../../../src/repositories/User';
import { AddTransactionValidator } from '../../../../src/validators/transactions/AddTransaction';
import { usersMock, usersPasswordMock } from '../../../mocks/UserData';
import { UserRepositoryMock } from '../../../mocks/UserRepository';

describe('Validator: GetUserTransactionsValidator', () => {
  let httpRequest: HttpRequest;
  let userRepository: UserRepository;
  let validator: AddTransactionValidator;
  let validate: HttpRequest;

  context('Transaction data is valid', () => {
    beforeEach(async () => {
      httpRequest = {
        body: {
          userId: usersMock[0].id,
          title: 'Troca do piso',
          value: 245.91,
          category: 'Manutenção',
          type: 'expense',
          description: '',
          isFixed: false,
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      validator = new AddTransactionValidator(userRepository);
      validate = await validator.validate(httpRequest) as HttpRequest;
    });

    it('should return an empty body and status 200', () => {
      expect(validate).to.be.eql({
        statusCode: 200,
        body: {},
      });
    });
  });

  context('Request or transaction data is not valid', () => {
    beforeEach(async () => {
      userRepository = new UserRepositoryMock(usersMock, usersPasswordMock);
      validator = new AddTransactionValidator(userRepository);
    });

    it("should return status 404 and 'Usuário não encontrado' on body when user does not exist", async () => {
      httpRequest = {
        body: {
          userId: 'xxxxxxxx-xxxxxx-xxxxx-xxxxxxx-xxxxxx',
          title: 'Troca do piso',
          value: 245.91,
          category: 'Manutenção',
          type: 'expense',
          description: '',
          isFixed: false,
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
    });

    it("should return status 401 and 'Usuário não é dono do recurso' when the requester id is different from user id", async () => {
      httpRequest = {
        body: {
          userId: usersMock[0].id,
          title: 'Troca do piso',
          value: 245.91,
          category: 'Manutenção',
          type: 'expense',
          description: '',
          isFixed: false,
        },
        requesterId: usersMock[1].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.be.eql({
        statusCode: 401,
        body: 'Usuário não é dono do recurso',
      });
    });

    it('should return status 400 and the missing attributes on body when the transaction does not have all the required attributes', async () => {
      httpRequest = {
        body: {
          userId: usersMock[0].id,
        },
        requesterId: usersMock[0].id,
      } as unknown as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate).to.be.eql({
        statusCode: 400,
        body: {
          missingAttrs: [
            'title', 'value', 'category', 'type', 'description', 'isFixed',
          ],
        },
      });
    });
  });
});
