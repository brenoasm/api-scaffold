import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create.user.dto';
import { UserEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  async login(@Body() createUserDTO: CreateUserDTO) {
    if (createUserDTO.password != createUserDTO.passwordConfirm) {
      throw new BadRequestException();
    }

    return this.userService.insert(createUserDTO);
  }
}
