import { Module } from '@nestjs/common';
import { RedisModule as IoRedisModule } from '@nestjs-modules/ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MessageModule } from 'src/message/message.module';
import { RedisService } from './redis.service';
import { PubSubModule } from 'src/common/pubsub.module';

@Module({
  imports: [
    IoRedisModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'single',
        url: configService.get<string>('REDIS_HOST'),
        options: {
          username: configService.get<string>('REDIS_USERNAME'),
          password: configService.get<string>('REDIS_PASSWORD'),
          db: configService.get<number>('REDIS_DB'),
          port: configService.get<number>('REDIS_PORT') || 6379,
        },
      }),
    }),
    MessageModule,
    PubSubModule,
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
