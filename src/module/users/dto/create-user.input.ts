import { InputType, Int, Field } from '@nestjs/graphql';
import { Gender } from '../entities/user.entities';

@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'name of the user' })
  name: string;
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @Field(() => String, { description: 'hashed password of the user' })
  password: string;
  @Field(() => String, { description: 'gender of the user' })
  gender: Gender;
}
