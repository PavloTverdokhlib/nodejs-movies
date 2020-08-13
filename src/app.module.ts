import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MoviesModule } from './modules/movies/movies.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IEnvironmentVariables } from './env.interface';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env.development',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService<IEnvironmentVariables>) => ({
        dbName: configService.get<string>('DB_NAME'),
        uri: configService.get<string>('DB_CONNECTION'),
      }),
    }),
    AuthModule,
    UsersModule,
    MoviesModule,
  ],
})
export class AppModule {}
