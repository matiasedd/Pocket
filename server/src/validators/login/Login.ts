import bcrypt from 'bcrypt';
import { HttpRequest } from '../../protocols/HttpRequest';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export const loginValidator: ControllerValidator = async (request: HttpRequest, userRepository: UserRepository) => {
  const { email, password } = request.body;
  const userExists = await userRepository.readByEmail(email);
  if (!userExists) {
    return {
      statusCode: 400,
      body: {
        message: 'Email ou senha incorretos',
      },
    };
  }
  const userPassword = await userRepository.getPassword(userExists.id);
  const passwordCheck = await bcrypt.compare(password, userPassword);
  if (passwordCheck) {
    return {
      statusCode: 200,
      body: {},
    };
  }
  return {
    statusCode: 400,
    body: {
      message: 'Email ou senha incorretos',
    },
  };
};
