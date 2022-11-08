import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType, Int } from '@nestjs/graphql';
import { Gender } from '../entities/user.entities';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field(() => Int, { description: 'id of the user' })
  id: number;
}
