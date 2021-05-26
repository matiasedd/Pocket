import { HttpRequest } from '../../protocols/HttpRequest';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export const updateUserValidator: ControllerValidator = async (request: HttpRequest, userRepository: UserRepository) => {
  const { userId } = request.params;
  const userExists = await userRepository.read(userId);
  if (userExists) {
    return {
      statusCode: 200,
      body: {},
    };
  }
  return {
    statusCode: 404,
    body: {
      message: 'Usuário não encontrado',
    },
  };
};
