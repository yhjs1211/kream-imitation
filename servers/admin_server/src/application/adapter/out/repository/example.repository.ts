import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '../../../../../generated/prisma';
import { PrismaService, SYMBOL_PRISMA_SERVICE } from '../../../../infrastructure/database/prisma.service';

@Injectable()
export class ExampleRepository {
  constructor(@Inject(SYMBOL_PRISMA_SERVICE) private readonly prisma: PrismaService) {}
}

export const SYMBOL_EXAMPLE_REPOSITORY = Symbol('EXAMPLE_REPOSITORY');
