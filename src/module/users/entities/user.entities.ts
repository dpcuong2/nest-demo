import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/module/posts/entities/post.entity';

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
  @Field(() => String, { description: 'created time stamp of the user' })
  createdAt: string;
  @Field(() => String, { description: 'updated time of the user' })
  updatedAt: string;
  @Field(() => [Post], { description: 'list post created by user' })
  Posts: Post[];
}

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}
