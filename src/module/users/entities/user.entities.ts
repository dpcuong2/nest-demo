import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => Int, { description: 'id of the user' })
  id: number;
  @Field(() => String, { description: 'name of the user' })
  name: string;
  @Field(() => String, { description: 'email of the user' })
  email: string;
  @Field(() => String, { description: 'hashed password of the user' })
  password: string;
  @Field(() => String, { description: 'gender of the user' })
  gender: Gender;
}


export enum Gender {
    MALE = 'male',
    FEMALE = 'female',
  }