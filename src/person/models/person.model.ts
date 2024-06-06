import { Field, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Person {
    @Field(type => ID)
    id: string

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