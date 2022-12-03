import { InputType, Int, Field } from '@nestjs/graphql';
import { User } from 'src/module/users/entities/user.entities';

@InputType()
export class CreatePostInput {
  @Field(() => String, { description: 'title of the post' })
  title: string;
  @Field(() => String, { description: 'body of the post' })
  body: string;
}
