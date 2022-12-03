import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }
  async onModuleDestroy() {
    try {
      await this.$connect();
    } catch (e) {
      console.error(e);
      await this.$disconnect();
    }
  }
  async onModuleInit() {
    await this.$disconnect();
  }
}
  