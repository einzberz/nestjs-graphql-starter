// src/redis/redis.service.ts
import { Injectable, OnModuleInit, Inject } from '@nestjs/common';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { PubSub } from 'graphql-subscriptions';
import { MessageService } from '../message/message.service';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit {
  constructor(
    @InjectRedis() private readonly redis: Redis,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
    private readonly messageService: MessageService,
  ) {}

  onModuleInit() {
    // Subscribe to message-related events
    this.redis.subscribe('messageChannel', (err, count) => {
      if (err) {
        console.error('Failed to subscribe: %s', err.message);
      } else {
        console.log(
          `Subscribed successfully! This client is currently subscribed to ${count} channels.`,
        );
      }
    });

    this.redis.on('message', async (ch, msg) => {
      console.log(`Received message on channel ${ch}:`, msg);
      try {
        if (ch === 'messageChannel') {
          const message = JSON.parse(msg);
          await this.messageService.create({
            content: message.content,
            sender: message.sender,
          });
          this.pubSub.publish('messageCreated', {
            messageCreated: message,
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  publishMessage(message: any) {
    this.redis.publish('messageChannel', JSON.stringify(message));
    console.log('Publishing message:', JSON.stringify(message));
  }
}
