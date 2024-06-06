import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonModule } from './person/person.module';
import { UsersModule } from './users/users.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      installSubscriptionHandlers: true,
      autoSchemaFile: 'schema.gql',
      playground: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/users'),
    PersonModule,
    UsersModule,
  ],
})
export class AppModule {}
