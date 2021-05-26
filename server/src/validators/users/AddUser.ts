import { HttpRequest } from '../../protocols/HttpRequest';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export const addUserValidator: ControllerValidator = async (request: HttpRequest, userRepository: UserRepository) => {
  const {
    firstName, lastName, email, emailAgain, password, passwordAgain,
  } = request.body;
  let validation = true;
  let message = '';
  if (email !== emailAgain) {
    message = 'Os endereços de email informados não coincidem';
    validation = false;
  }
  if (password !== passwordAgain) {
    message = 'As senhas informadas não coincidem';
    validation = false;
  }
  if (!firstName || !lastName) {
    message = 'É preciso informar seu nome completo';
    validation = false;
  }
  if (!email) {
    message = 'É preciso informar seu endereço de email';
    validation = false;
  }
  if (!password) {
    message = 'É preciso informar uma senha';
    validation = false;
  }
  if (validation) {
    return {
      statusCode: 200,
      body: {},
    };
  }
  return {
    statusCode: 404,
    body: {
      message,
    },
  };
};
