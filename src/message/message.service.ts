// src/message/message.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { PubSub } from 'graphql-subscriptions';
import { InjectRedis } from '@nestjs-modules/ioredis';
import { Redis } from 'ioredis';

@Injectable()
export class MessageService {
  // private publisher: Redis;
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
    @InjectRedis() private readonly redis: Redis,
    // @InjectRedis() private readonly subscriber: Redis,
  ) {}

  async create(createMessageInput: CreateMessageInput): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageInput);
    await createdMessage.save();
    this.pubSub.publish('messageChannel', { messageCreated: createdMessage });
    // this.publishMessage(createdMessage);
    return createdMessage;
  }

  async onModuleInit() {
    // Subscribe to message-related events
    // this.redis.subscribe('messageChannel', (err, count) => {
    //   if (err) {
    //     console.error('Failed to subscribe: %s', err.message);
    //   } else {
    //     console.log(
    //       `Subscribed successfully! This client is currently subscribed to ${count} channels.`,
    //     );
    //   }
    // });

    this.redis.on('message', async (ch, msg) => {
      console.log(`Received message on channel ${ch}:`, msg);
      try {
        if (ch === 'messageChannel') {
          const message = JSON.parse(msg);
          await this.create({
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
  // for publisher only (if on subscribe cannot use)
  async publishMessage(message: any) {
    this.redis.publish('messageChannel', JSON.stringify(message));
    console.log('Publishing message:', JSON.stringify(message));
  }
}
