import { CreateUserInput } from './create-user.input';
import { InputType, Field, PickType } from '@nestjs/graphql';

@InputType()
export class LoginUserInput extends PickType(CreateUserInput, [
  'email',
  'password',
] as const) {}
