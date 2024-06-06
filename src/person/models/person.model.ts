import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Person {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String)
  gender: string;

  @Field(() => String, { nullable: true })
  birthDay?: string;
}
