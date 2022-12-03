import { Field, ObjectType, OmitType } from '@nestjs/graphql';
import { User } from '../entities/user.entities';

@ObjectType()
export class UserResponse extends OmitType(User, ['password'] as const) {
  @Field(() => String, {
    description: 'generated jwt token of user',
    nullable: true,
  })
  token: string;
}
