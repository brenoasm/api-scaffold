import { Inject, Injectable } from '@nestjs/common';
import { USER_REPOSITORY } from 'src/commons/constants';
import { CreateUserDTO } from './dtos/create.user.dto';
import { UserEntity } from './entities/user.entity';
import { UserMapper } from './mappers/user.mapper';
import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: typeof UserModel,
  ) {}

  async findOne(email: string): Promise<UserEntity | undefined> {
    const result = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (result == null) {
      return null;
    }

    return UserMapper.toEntity(result);
  }

  async insert(createUserDTO: CreateUserDTO): Promise<UserEntity | undefined> {
    const result = await this.userRepository.create({
      username: createUserDTO.username,
      email: createUserDTO.email,
      password: createUserDTO.password,
    });

    return UserMapper.toEntity(result);
  }
}
