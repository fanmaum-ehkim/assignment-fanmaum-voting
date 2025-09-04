import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError, GraphQLFormattedError } from 'graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { Request } from 'express';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';
import { StarModule } from './star/star.module';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: async () => ({
        playground: true,
        introspection: true,
        autoSchemaFile: join(process.cwd(), 'src/generated/schema.gql'),
        sortSchema: true,
        fieldResolverEnhancers: ['guards', 'filters', 'interceptors'],
        formatError: (error: GraphQLError) => {
          const graphQLFormattedError: GraphQLFormattedError = {
            ...error,
          };
          return graphQLFormattedError;
        },
        context: ({ req }: { req: Request }) => {
          return req.context;
        },
      }),
    }),
    PrismaModule,
    AuthModule,
    UserModule,
    VoteModule,
    StarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
