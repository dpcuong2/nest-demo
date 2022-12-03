import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsResolver } from './posts.resolver';
import { UsersModule } from '../users/users.module';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [UsersModule],
  providers: [PostsResolver, PostsService, PrismaService, JwtService],
})
export class PostsModule {}
