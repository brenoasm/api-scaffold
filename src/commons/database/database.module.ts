import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DATABASE_PROVIDER } from '../constants';
import { DatabaseService } from './database.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DATABASE_PROVIDER,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const provider = DatabaseService.getProvider();

        return provider(configService);
      },
    },
  ],
  exports: [],
})
export class DatabaseModule {}
