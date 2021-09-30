import { CreateUserDTO } from '../dtos/create.user.dto';
import { UserEntity } from '../entities/user.entity';
import { UserModel } from '../models/user.model';

export class UserMapper {
  static toEntity(model: UserModel): UserEntity {
    return {
      id: model.id,
      email: model.email,
      username: model.username,
      password: model.password,
    };
  }
}
