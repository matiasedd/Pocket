/* eslint-disable no-undef */
import { expect } from 'chai';
import { HttpRequest } from '../../../src/protocols/HttpRequest';
import { AddUserValidator } from '../../../src/validators/users/AddUser';

describe('Validator: AddUserValidator', () => {
  let httpRequest: HttpRequest;
  let validator: AddUserValidator;
  let validate: HttpRequest;

  context('User data is valid', () => {
    beforeEach(async () => {
      httpRequest = {
        body: {
          firstName: 'Billy',
          lastName: 'Idol',
          email: 'billy.idol@hitmail.com',
          emailAgain: 'billy.idol@hitmail.com',
          password: 'eyeswithoutaface',
          passwordAgain: 'eyeswithoutaface',
        },
      } as HttpRequest;
      validator = new AddUserValidator();
      validate = await validator.validate(httpRequest) as HttpRequest;
    });

    it('should return an empty body', () => {
      expect(validate.body).to.be.eql({});
    });

    it('should return statusCode 200', () => {
      expect(validate.statusCode).to.be.equals(200);
    });
  });

  context('User data is not valid', () => {
    beforeEach(async () => {
      validator = new AddUserValidator();
    });

    it("should have a body with message 'Os endereços de email informados não coincidem' when email addresses did not match", async () => {
      httpRequest = {
        body: {
          firstName: 'Billy',
          lastName: 'Idol',
          email: 'billy.idol@hitmail.com',
          emailAgain: 'billy.fan@hitmail.com',
          password: 'eyeswithoutaface',
          passwordAgain: 'eyeswithoutaface',
        },
      } as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate.body.message).to.equals('Os endereços de email informados não coincidem');
    });

    it("should have a body with message 'As senhas informadas não coincidem' when passwords did not match", async () => {
      httpRequest = {
        body: {
          firstName: 'Billy',
          lastName: 'Idol',
          email: 'billy.idol@hitmail.com',
          emailAgain: 'billy.idol@hitmail.com',
          password: 'eyeswithoutaface',
          passwordAgain: 'eyeswithaface',
        },
      } as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate.body.message).to.equals('As senhas informadas não coincidem');
    });

    it("should have a body with message 'É preciso informar seu nome completo' when either first or last name is not provided", async () => {
      httpRequest = {
        body: {
          firstName: 'Billy',
          lastName: '',
          email: 'billy.idol@hitmail.com',
          emailAgain: 'billy.idol@hitmail.com',
          password: 'eyeswithoutaface',
          passwordAgain: 'eyeswithoutaface',
        },
      } as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate.body.message).to.equals('É preciso informar seu nome completo');

      httpRequest = {
        body: {
          firstName: '',
          lastName: 'Idol',
          email: 'billy.idol@hitmail.com',
          emailAgain: 'billy.idol@hitmail.com',
          password: 'eyeswithoutaface',
          passwordAgain: 'eyeswithoutaface',
        },
      } as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate.body.message).to.equals('É preciso informar seu nome completo');
    });

    it("should have a body with message 'É preciso informar seu endereço de email' when email is not provided", async () => {
      httpRequest = {
        body: {
          firstName: 'Billy',
          lastName: 'Idol',
          email: '',
          emailAgain: '',
          password: 'eyeswithoutaface',
          passwordAgain: 'eyeswithoutaface',
        },
      } as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate.body.message).to.equals('É preciso informar seu endereço de email');
    });

    it("should have a body with message 'É preciso informar uma senha' when a password is not provided", async () => {
      httpRequest = {
        body: {
          firstName: 'Billy',
          lastName: 'Idol',
          email: 'billy.idol@hitmail.com',
          emailAgain: 'billy.idol@hitmail.com',
          password: '',
          passwordAgain: '',
        },
      } as HttpRequest;
      validate = await validator.validate(httpRequest) as HttpRequest;
      expect(validate.body.message).to.equals('É preciso informar uma senha');
    });
  });
});
