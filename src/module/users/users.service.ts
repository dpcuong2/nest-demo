import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/core/prisma/prima.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    const user: Prisma.UsersCreateInput = {
      name: createUserInput.name,
      email: createUserInput.email,
      password: createUserInput.password,
      gender: createUserInput.gender,
    };

    return this.prisma.users.create({ data: user });
  }

  findOne(id: number) {
    return this.prisma.users.findUnique({ where: { id: id } });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    const user: Prisma.UsersUpdateInput = {
      name: updateUserInput.name,
      email: updateUserInput.email,
      password: updateUserInput.password,
      gender: updateUserInput.gender,
    };
    return this.prisma.users.update({
      where: { id: id },
      data: user,
    });
  }

  remove(id: number) {
    return this.prisma.users.delete({
      where: { id: id },
    });
  }
}
