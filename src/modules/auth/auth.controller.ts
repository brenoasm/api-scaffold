import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { SendRecoveryCodeDTO } from './dtos/send.recovery.code.dto';
import { JwtAuthGuard } from './guards/jwt.auth.guard';
import { LocalAuthGuard } from './guards/local.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('sendRecoveryCode')
  @HttpCode(204)
  async sendRecoveryCode(
    @Body() sendRecoveryCodeDTO: SendRecoveryCodeDTO,
  ): Promise<void> {
    await this.authService.sendRecoveryCode(sendRecoveryCodeDTO);
  }
}
