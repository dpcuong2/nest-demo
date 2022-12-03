import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { User } from '../users/entities/user.entities';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';

@Injectable()
export class PostsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPostInput: CreatePostInput, user: User) {
    const post: Prisma.PostsCreateInput = {
      title: createPostInput.title,
      body: createPostInput.body,
      Users: {
        connect: { id: user.id },
      },
    };
    const newPost = await this.prisma.posts.create({ data: post });
    return newPost;
  }

  findAllOfOneUser(userId: number) {
    return this.prisma.posts.findMany({ where: { userId: userId } });
  }

  findAll() {
    return this.prisma.posts.findMany();
  }

  findOne(id: number) {
    return this.prisma.posts.findUnique({ where: { id: id } });
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    const post: Prisma.PostsUpdateInput = {
      title: updatePostInput.title,
      body: updatePostInput.body,
    };
    return this.prisma.posts.update({ where: { id: id }, data: post });
  }

  remove(id: number) {
    return this.prisma.posts.delete({ where: { id: id } });
  }
}
