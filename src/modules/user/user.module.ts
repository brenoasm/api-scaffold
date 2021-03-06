import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/commons/database/database.module';
import { userProviders } from './user.providers';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  imports: [DatabaseModule],
  providers: [UserService, ...userProviders],
  exports: [UserService],
  controllers: [UserController],
})
export class UserModule {}
