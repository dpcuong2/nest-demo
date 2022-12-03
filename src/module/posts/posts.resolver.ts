import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { UseGuards } from '@nestjs/common';
import { JwtGraphqlAuthGuard } from 'src/core/guard/jwtGraphQLAuthGuard.guard';
import { User } from '../users/user.decorator';
import { UsersService } from '../users/users.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(JwtGraphqlAuthGuard)
  @Mutation(() => Post)
  createPost(
    @User() user,
    @Args('createPostInput') createPostInput: CreatePostInput,
  ) {
    return this.postsService.create(createPostInput, user);
  }

  @UseGuards(JwtGraphqlAuthGuard)
  @Query(() => [Post], { name: 'posts' })
  findAllOfOneUser(@User() user) {
    return this.postsService.findAllOfOneUser(user.id);
  }

  @Query(() => [Post], { name: 'AllPosts' })
  findAll(@User() user) {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.findOne(id);
  }
  @UseGuards(JwtGraphqlAuthGuard)
  @Mutation(() => Post)
  updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }
  @UseGuards(JwtGraphqlAuthGuard)
  @Mutation(() => Post)
  removePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.remove(id);
  }

  @ResolveField()
  user(@Parent() post) {
    const id = post.userId;
    return this.userService.findOne(id);
  }
}
