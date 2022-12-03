import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Prisma } from '@prisma/client';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user.entities';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  findOne(id: number) {
    return this.prisma.users.findUnique({ where: { id: id } });
  }

  async update(currentUser: User, updateUserInput: UpdateUserInput) {
    if (updateUserInput.password) {
      updateUserInput.password = await bcrypt.hash(
        updateUserInput.password,
        Number(process.env.BYCRYPT_SALT),
      );
    }
    const user: Prisma.UsersUpdateInput = {
      name: updateUserInput?.name || currentUser.name,
      email: updateUserInput?.email || currentUser.email,
      password: updateUserInput?.password || currentUser.password,
      gender: updateUserInput?.gender || currentUser.gender,
    };
    return this.prisma.users.update({
      where: { id: currentUser.id },
      data: user,
    });
  }

  remove(id: number) {
    return this.prisma.users.delete({
      where: { id: id },
    });
  }

  findOneByEmail(email: string) {
    return this.prisma.users.findUnique({ where: { email: email } });
  }
}
