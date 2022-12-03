import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtGraphqlAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  async canActivate(context: ExecutionContext) {
    const { req } = GqlExecutionContext.create(context).getContext();
    if (!req.headers.authorization) return false;
    const user = await this.validateToken(req.headers.authorization);
    req.user = user;
    return true;
  }

  async validateToken(auth: string) {
    const [type, token] = auth.split(' ');

    if (type !== 'Bearer') {
      throw new HttpException(
        'Invalid token not bearer',
        HttpStatus.UNAUTHORIZED,
      );
    }
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new HttpException('Token expired', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }
}
