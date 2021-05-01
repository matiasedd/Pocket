import {UserModel} from '../../models/User';
import { UserRepository } from '../../repositories/User';

export async function createUsers() {
  const userRepo = new UserRepository();
  const userExists = await userRepo.readByEmail(users[0].email);
  if (!userExists) {
    console.log('User does not exist. Creating...');
    await userRepo.insert(users[0]);
  } else {
    console.log('User already exists:');
    console.log(userExists);
  }
}
