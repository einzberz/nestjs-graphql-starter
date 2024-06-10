import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonModule } from './person/person.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';
import { CommonModule } from './common/common.module';
import { MessageModule } from './message/message.module';
import { PubSubModule } from './common/pubsub.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    CommonModule,
    MongooseModule.forRoot('mongodb://localhost:27017/users'),
    PersonModule,
    UsersModule,
    RedisModule,
    MessageModule,
    PubSubModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
