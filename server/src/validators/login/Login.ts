import bcrypt from 'bcrypt';
import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../Base';

export class LoginValidator extends ControllerValidator {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async validate(request: HttpRequest): Promise<HttpResponse> {
    const { email, password } = request.body;
    const userExists = await this.userRepository.readByEmail(email);
    if (!userExists) {
      return {
        statusCode: 400,
        body: {
          message: 'Email ou senha incorretos',
        },
      };
    }
    const userPassword = await this.userRepository.getPassword(userExists.id);
    const passwordCheck = await bcrypt.compare(password, userPassword.id);
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
  }
}
