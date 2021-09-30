import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

import { DatabaseConfigAttributes } from './interfaces/databaseConfig.interface';

import { UserModel } from '../../modules/user/models/user.model';

type DatabaseProvider = (configService: ConfigService) => Promise<any>;

@Injectable()
export class DatabaseService {
  constructor() {}

  static getProvider(): DatabaseProvider {
    return async (configService: ConfigService) => {
      const config = <DatabaseConfigAttributes>{
        database: configService.get<String>('DATABASE_NAME'),
        host: configService.get<String>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<String>('DATABASE_USERNAME'),
        password: configService.get<String>('DATABASE_PASSWORD'),
        dialect: 'postgres',
      };

      const sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        {
          host: config.host,
          port: config.port as number,
          dialect: config.dialect,
        },
      );

      sequelize.addModels([UserModel]);

      await sequelize.sync();

      return sequelize;
    };
  }
}

export { DatabaseProvider };
