import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InputPerson {
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

@InputType()
export class UpdatePerson {
  @Field(() => String, { nullable: true })
  username?: string;

  @Field(() => String, { nullable: true })
  firstName?: string;

  @Field(() => String, { nullable: true })
  lastName?: string;

  @Field(() => String, { nullable: true })
  email?: string;

  @Field(() => String, { nullable: true })
  gender?: string;

  @Field(() => String, { nullable: true })
  birthDay?: string;
}
