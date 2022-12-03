import { InputType, Field } from '@nestjs/graphql';
import { Gender } from '../entities/user.entities';
import { IsEmail, IsNotEmpty } from 'class-validator';
@InputType()
export class CreateUserInput {
  @IsNotEmpty()
  @Field(() => String, { description: 'name of the user' })
  name: string;
  @IsEmail()
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @IsNotEmpty()
  @Field(() => String, { description: 'hashed password of the user' })
  password: string;
  @IsNotEmpty()
  @Field(() => String, { description: 'gender of the user' })
  gender: Gender;
}
