/* eslint-disable no-undef */
import chai from 'chai';
import chaiHttp from 'chai-http';
import { PocketApp } from '../../src/App';

chai.use(chaiHttp);
const { expect } = chai;

describe('Use case: User CRUD', () => {
  const { app } = new PocketApp();
  const userToCreate = {
    firstName: 'Billy',
    lastName: 'Idol',
    email: 'billy.idol@hitmail.com',
  };
  const signupForm = {
    ...userToCreate,
    emailAgain: 'billy.idol@hitmail.com',
    password: 'eyeswithoutaface',
    passwordAgain: 'eyeswithoutaface',
  };
  let createResponse;
  let loginResponse;
  let deleteResponse;
  let xAccessToken;

  process.env.JWT_SECRET = 'TEST';

  it('should create a new user', async () => {
    createResponse = await chai.request(app)
      .post('/users')
      .send(signupForm) as any;
    expect(createResponse).to.have.status(200);
  });

  it('should be able to login', async () => {
    const loginForm = {
      email: signupForm.email,
      password: signupForm.password,
    };
    loginResponse = await chai.request(app)
      .post('/login')
      .send(loginForm);
    expect(loginResponse).to.have.status(200);
    expect(loginResponse.body).to.haveOwnProperty('token').which.be.a('string');
    xAccessToken = loginResponse.body.token;
  });

  it('should be able to get data from the created user', async () => {
    const userId = createResponse.body.id;
    const readResponse = await chai.request(app)
      .get(`/users/${userId}`)
      .set('x-access-token', xAccessToken)
      .send();
    expect(readResponse).to.have.status(200);
    Object.keys(userToCreate).map((key) => {
      expect(readResponse.body[key]).to.be.eql(userToCreate[key]);
      return null;
    });
  });

  it('should be able to update the created user', async () => {
    const userId = createResponse.body.id;
    const updatedUser = {
      firstName: 'John',
      lastName: 'Lennon',
      email: 'john.lennon@hitmail.com',
    };
    const expectedResponse = {
      firstName: 'John', // firstName deve ser atualizado
      lastName: 'Lennon', // lastName deve ser atualizado
      email: 'billy.idol@hitmail.com', // E-mail não deve ser atualizado
    };
    const updateResponse = await chai.request(app)
      .put(`/users/${userId}`)
      .set('x-access-token', xAccessToken)
      .send(updatedUser);
    expect(updateResponse).to.have.status(200);
    Object.keys(expectedResponse).map((key) => {
      expect(updateResponse.body[key]).to.be.eql(expectedResponse[key]);
      return null;
    });
  });

  it('should delete the just created user', async () => {
    const userId = createResponse.body.id;
    deleteResponse = await chai.request(app)
      .delete(`/users/${userId}`)
      .set('x-access-token', xAccessToken)
      .send();
    expect(deleteResponse).to.have.status(200);
  });
});
