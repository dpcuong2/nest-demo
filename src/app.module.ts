import { Module, CacheModule } from '@nestjs/common';
import { AppService } from './app.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { UsersModule } from './module/users/users.module';
import { PostsModule } from './module/posts/posts.module';
import { AuthModule } from './module/auth/auth.module';
import * as redisStore from 'cache-manager-redis-store';
import type { ClientOpts } from 'redis';
import { PrismaModule } from './core/prisma/prisma.module';
@Module({
  imports: [
    PrismaModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    CacheModule.register<ClientOpts>({
      isGlobal: true,
      host: 'localhost',
      port: 6379,
      store: redisStore,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
  ],
  providers: [AppService, PrismaModule],
  exports: [PrismaModule],
})
export class AppModule {}
