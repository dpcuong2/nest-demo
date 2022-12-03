import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entities';
import { User as UserDecorator } from './user.decorator';
import { UpdateUserInput } from './dto/update-user.input';
import { UserResponse } from './dto/user.response';
import { Post } from '../posts/entities/post.entity';
import { JwtGraphqlAuthGuard } from 'src/core/guard/jwtGraphQLAuthGuard.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtGraphqlAuthGuard)
  @Mutation(() => UserResponse)
  updateUser(
    @UserDecorator() user,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(user, updateUserInput);
  }
}
