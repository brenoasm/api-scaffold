import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { UserEntity, UserProfile } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { Encrypt } from 'src/commons/encrypt';
import { SendRecoveryCodeDTO } from './dtos/send.recovery.code.dto';
import { RecoveryCodeModel } from './models/recovery.code.model';
import { RECOVERY_CODE_REPOSITORY } from 'src/commons/constants';
import { generateRecoveryCode } from 'src/commons/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    @Inject(RECOVERY_CODE_REPOSITORY)
    private readonly recoveryCodeRepository: typeof RecoveryCodeModel,
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

  async sendRecoveryCode(
    sendRecoveryCodeDTO: SendRecoveryCodeDTO,
  ): Promise<void> {
    const user = await this.usersService.findOne(sendRecoveryCodeDTO.email);

    if (user == null) {
      return;
    }

    const currentRecoveryCode = await this.recoveryCodeRepository.findOne({
      where: {
        email: sendRecoveryCodeDTO.email,
      },
    });

    if (currentRecoveryCode != null) {
      await currentRecoveryCode.destroy();
    }

    const code = generateRecoveryCode();
    const currentDate = new Date();
    const expiresIn = new Date(
      currentDate.setHours(currentDate.getHours() + 3),
    );

    await this.recoveryCodeRepository.create({
      email: sendRecoveryCodeDTO.email,
      code: code,
      expiresIn: expiresIn,
    });
  }
}
