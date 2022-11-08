import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './module/users/users.module';
import { PostsModule } from './module/posts/posts.module';
import { AuthModule } from './module/auth/auth.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
  providers: [AppService],
})
export class AppModule {}
