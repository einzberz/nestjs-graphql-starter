// src/graphql/message.resolver.ts
import { Resolver, Mutation, Args, Subscription } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';
import { MessageService } from '../message/message.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';

@Resolver(() => Message)
export class MessageResolver {
  constructor(
    private readonly messageService: MessageService,
    @Inject('PUB_SUB') private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => Message)
  async createMessage(
    @Args('createMessageInput') createMessageInput: CreateMessageInput,
  ): Promise<Message> {
    return this.messageService.create(createMessageInput);
  }

  @Subscription(() => Message)
  messageCreated() {
    return this.pubSub.asyncIterator('messageChannel');
  }
}
