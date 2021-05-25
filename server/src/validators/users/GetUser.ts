import { HttpRequest } from '../../protocols/HttpRequest';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export const getUserValidator: ControllerValidator = async (request: HttpRequest, userRepository: UserRepository) => {
  const { userId } = request.params;
  const userExists = await userRepository.read(userId);
  if (userExists) {
    return {
      statusCode: 200,
      body: {
        userEmail: userExists.email,
      },
    };
  }
  return {
    statusCode: 404,
    body: {
      message: 'Usuário não encontrado',
    },
  };
};
