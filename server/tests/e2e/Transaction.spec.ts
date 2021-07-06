/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { PocketApp } from '../../src/App';
import { usersMock } from '../mocks/UserData';

chai.use(chaiHttp);
const { expect } = chai;

describe('Entity: Transaction', () => {
  const { app } = new PocketApp();
  let login;
  let xAccessToken: string;
  let userId: string;
  let transaction;
  let transactionId: string;

  process.env.JWT_SECRET = 'TEST';

  it('should do login to get a token', async () => {
    process.env.NODE_ENV = 'development';
    login = await chai.request(app)
      .post('/login')
      .send({
        email: 'john.doe@email.com',
        password: 'johnpass',
      });
    expect(login).to.have.status(200);
    expect(login.body.token).to.exist.and.be.a('string');
    xAccessToken = login.body.token;
    userId = login.body.userId;
  });

  it('should be able to create a transaction', async () => {
    transaction = {
      userId,
      title: 'Venda do carro',
      value: 18000,
      category: 'venda',
      type: 'income',
      description: 'Celta rebaixado 2007',
      isFixed: false,
    };
    const create = await chai.request(app)
      .post('/transactions')
      .set('x-access-token', xAccessToken)
      .send(transaction);
    expect(create).to.have.status(200);
    Object.keys(transaction).map((key) => {
      expect(create.body[key]).to.be.equal(transaction[key]);
      return null;
    });
    transactionId = create.body.id;
  });

  it('should be able to update a transaction', async () => {
    transaction = {
      id: transactionId,
      userId,
      title: 'Aluguel',
      value: 1200,
      category: 'conta',
      type: 'expense',
      description: '',
      isFixed: true,
    };
    const update = await chai.request(app)
      .put(`/transactions/${transactionId}`)
      .set('x-access-token', xAccessToken)
      .send(transaction);
    expect(update).to.have.status(200);
    Object.keys(transaction).map((key) => {
      expect(update.body[key]).to.be.equal(transaction[key]);
      return null;
    });
  });

  it('should be able to delete a transaction', async () => {
    const delet = await chai.request(app)
      .delete(`/transactions/${transactionId}`)
      .set('x-access-token', xAccessToken)
      .send();
    expect(delet).to.have.status(200);
  });
});
