// src/message/message.service.ts
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name) private messageModel: Model<Message>,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  async create(createMessageInput: CreateMessageInput): Promise<Message> {
    const createdMessage = new this.messageModel(createMessageInput);
    await createdMessage.save();
    this.pubSub.publish('messageCreated', { messageCreated: createdMessage });
    return createdMessage;
  }

  async findAll(): Promise<Message[]> {
    return this.messageModel.find().exec();
  }
}
