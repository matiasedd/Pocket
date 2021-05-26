import bcrypt from 'bcrypt';
import { HttpRequest } from '../../protocols/HttpRequest';
import { HttpResponse } from '../../protocols/HttpResponse';
import { UserRepository } from '../../repositories/User';
import { ControllerValidator } from '../../validators/Base';
import { BaseAssertiveController } from '../BaseAssertive';

export class AddUserController extends BaseAssertiveController {
  private userRepository: UserRepository;

  constructor(validator: ControllerValidator, repository: UserRepository) {
    super(validator);
    this.userRepository = repository;
  }

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const {
      firstName, lastName, email, password,
    } = request.body;
    const newUser = {
      firstName,
      lastName,
      email,
      softDelete: false,
    };
    const user = await this.userRepository.insert(newUser);
    const passwordHash = await bcrypt.hash(password, 10);
    const userPassword = {
      userId: user.id,
      id: passwordHash,
      softDelete: false,
    };
    await this.userRepository.insertPassword(userPassword);
    return {
      statusCode: 200,
      body: user,
    };
  }
}
