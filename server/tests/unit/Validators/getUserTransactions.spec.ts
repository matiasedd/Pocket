/* eslint-disable no-undef */
import { expect } from 'chai';
import { UserViewModel } from '../../../src/models/User';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { UserRepository } from '../../../src/repositories/User';
import { getUserTransactionsValidator } from '../../../src/validators/transactions/getUserTransactions';

describe('Validator: getUserTransactionsValidator', () => {
  const usersMock: [UserViewModel] = [
    {
      id: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@email.com',
      createdAt: new Date(),
      updatedAt: new Date(),
      softDelete: false,
    },
  ];

  const userRepositoryMock = {
    async read(userId: string) {
      const foundUser = usersMock.filter((user) => user.id === userId);
      return Promise.resolve(foundUser.length > 0 ? foundUser[0] : null);
    },
  } as unknown as UserRepository;

  const httpRequestMock = {
    body: {},
    params: {
      userId: 'd0f83766-f595-42ab-9c23-d489b8d3ff57',
    },
  } as unknown as HttpRequest;

  it('should return an httpRequest with empty body and status 200 when the user id exists', async () => {
    const httpRequest = httpRequestMock;
    const validate = await getUserTransactionsValidator(httpRequest, userRepositoryMock);
    const { body } = validate;
    expect(body).to.exist;
    expect(typeof body).to.be.equals('object');
    expect(Object.keys(body).length).to.equals(0);
  });

  it("should return an httpRequest with body with message 'Usuário não encontrado' and statusCode 404 when the user does not exist", async () => {
    const httpRequest = {
      body: {},
      params: {
        userId: 'xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxx',
      },
    } as unknown as HttpRequest;
    const validate = await getUserTransactionsValidator(httpRequest, userRepositoryMock);
    const { body, statusCode } = validate;
    expect(body).to.exist;
    expect(body.message).to.exist;
    expect(body.message).to.be.a('string');
    expect(body.message).to.equals('Usuário não encontrado');
    expect(statusCode).to.equals(404);
  });
});
