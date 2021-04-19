import { HttpRequest } from '../protocols/HttpRequest';
import { UserRepository } from '../repositories/User';

export const getUserTransactionsValidation = async (request: HttpRequest) => {
  const userRepo = new UserRepository();
  const { userId } = request.params;
  const userExists = await userRepo.read(userId);
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
