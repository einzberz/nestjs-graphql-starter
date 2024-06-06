import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class InputPerson {

    @Field(type => String)
    username: string

    @Field(type => String)
    firstName: string

    @Field(type => String, { nullable: true })
    lastName?: string

    @Field(type => String, { nullable: true })
    email?: string

    @Field(type => String)
    gender: string

    @Field(type => String, { nullable: true })
    birthDay?: string
}

@InputType()
export class UpdatePerson {
  @Field(type => String, { nullable: true })
  username?: string;

  @Field(type => String, { nullable: true })
  firstName?: string;

  @Field(type => String, { nullable: true })
  lastName?: string;

  @Field(type => String, { nullable: true })
  email?: string;

  @Field(type => String, { nullable: true })
  gender?: string;

  @Field(type => String, { nullable: true })
  birthDay?: string;
}