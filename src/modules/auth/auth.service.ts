import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity, UserProfile } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Encrypt } from 'src/commons/encrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserProfile> {
    const user = await this.usersService.findOne(email);

    const hashedPassword = await Encrypt.hash(password);

    if (user && (await Encrypt.compare(password, hashedPassword))) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: UserEntity) {
    const payload = { username: user.email, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
