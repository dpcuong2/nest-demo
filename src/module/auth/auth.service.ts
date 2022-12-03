import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateUserInput } from '../users/dto/create-user.input';
import { Prisma } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const checkExistUser = await this.userService.findOneByEmail(
      createUserInput.email,
    );
    if (checkExistUser) throw new BadRequestException('user existed');
    const hashedPassword = await this.hashPassword(createUserInput.password);
    const user: Prisma.UsersCreateInput = {
      name: createUserInput.name,
      email: createUserInput.email,
      password: hashedPassword,
      gender: createUserInput.gender,
    };

    const newUser = await this.prisma.users.create({ data: user });
    const { password, ...result } = newUser;
    return this.login(result);
  }

  async validateUser(username: string, pass: string) {
    // find if user exist with this email
    const user = await this.userService.findOneByEmail(username);
    if (!user) {
      throw new BadRequestException(`don't have user ${username}`);
    }

    // find if user password matches
    const match = await this.comparePassword(pass, user.password);
    if (!match) {   
      console.log(`login fail for user ${username} wrong password`);
      throw new BadRequestException('wrong password');
    }

    const { password, ...result } = user;
    return this.login(result)
  }

  private async comparePassword(enteredPassword, dbPassword) {
    const match = await bcrypt.compare(enteredPassword, dbPassword);
    return match;
  }

  async login(user) {
    const token = await this.generateToken(user);
    return { ...user, token };
  }

  private async generateToken(user) {
    const token = await this.jwtService.signAsync(user, {secret: process.env.JWT_SECRET     });
    return token;
  }
  async hashPassword(password: string) {
    const hash = await bcrypt.hash(password, Number(process.env.BYCRYPT_SALT));
    return hash;
  }
}
