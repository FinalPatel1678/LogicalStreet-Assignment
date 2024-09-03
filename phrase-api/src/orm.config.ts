import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export const ormConfig: (
  configService: ConfigService,
) => TypeOrmModuleOptions = (configService) => ({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_NAME'),
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  synchronize: true,
});
