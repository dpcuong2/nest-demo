import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/module/users/entities/user.entities';

@ObjectType()
export class Post {
  @Field(() => Int, { description: 'id of the post' })
  id: number;
  @Field(() => String, { description: 'title of the post' })
  title: string;
  @Field(() => String, { description: 'body of the post' })
  body: string;
  @Field(() => String, { description: 'create timestamp of the post' })
  createdAt: string;
  @Field(() => String, { description: 'last updated timestamp of the post' })
  updatedAt: string;
  @Field(() => User, { description: 'user of the post' })
  user: User;
}
