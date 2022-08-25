// import type { RedisClientOptions } from 'redis';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './app/users/users.module';
import { AuthModule } from './auth/auth.module';
import { MoviesModule } from './app/movies/movies.module';
import * as redisStore from 'cache-manager-redis-store';

@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      // store: redisStore,
      // socket: {
      //   host: 'localhost',
      //   port: 6379,
      // },
    }),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      synchronize: true,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      ssl: { rejectUnauthorized: false },
    }),
    UsersModule,
    AuthModule,
    MoviesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
