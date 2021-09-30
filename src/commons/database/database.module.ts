import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseService, PROVIDER } from './database.service';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: PROVIDER,
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
