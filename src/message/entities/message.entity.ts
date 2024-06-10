import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Message {
  @Field(() => ID)
  id: number;

  @Field()
  content: string;

  @Field()
  sender: string;

  @Field()
  createdAt: Date;
}
