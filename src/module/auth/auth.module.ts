import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: 3600 },
    }),
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, PrismaService],
})
export class AuthModule {}
