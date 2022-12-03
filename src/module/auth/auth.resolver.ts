import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateUserInput } from '../users/dto/create-user.input';
import { LoginUserInput } from '../users/dto/login-user.input';
import { UserResponse } from '../users/dto/user.response';
import { AuthService } from './auth.service';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserResponse)
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.authService.create(createUserInput);
  }

  @Mutation(() => UserResponse)
  login(@Args('loginInput') loginInput: LoginUserInput) {
    return this.authService.validateUser(loginInput.email, loginInput.password);
  }
}
