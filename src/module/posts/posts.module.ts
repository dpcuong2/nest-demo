import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UsersModule } from '../users/users.module';
import { PrismaService } from 'src/core/prisma/prima.service';

@Module({
  imports: [UsersModule],
  providers: [PostsResolver, PostsService, PrismaService],
})
export class PostsModule {}
