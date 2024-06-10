import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { DateTimeScalar } from './dateTime.scalar';
import { MessageResolver } from '../message/message.resolver';
import { MessageModule } from 'src/message/message.module';
import { PubSubModule } from './pubsub.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      autoSchemaFile: 'schema.gql',
      subscriptions: {
        'graphql-ws': true,
      },
    }),
    MessageModule,
    PubSubModule,
  ],
  providers: [DateTimeScalar, MessageResolver],
})
export class GraphqlModule {}
