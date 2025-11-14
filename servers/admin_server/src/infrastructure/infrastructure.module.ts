import { Module } from '@nestjs/common';
import { DomainModule } from '../domain/domain.module';
import { PrismaService, SYMBOL_PRISMA_SERVICE } from './database/prisma.service';
import { Converter, SYMBOL_CONVERTER } from './helper/converter';
import { DateHelper, SYMBOL_DATE_HELPER } from './helper/date.helper';
@Module({
  exports: [DomainModule, SYMBOL_PRISMA_SERVICE, SYMBOL_DATE_HELPER, SYMBOL_CONVERTER],
  imports: [DomainModule],
  providers: [
    {
      provide: SYMBOL_PRISMA_SERVICE,
      useClass: PrismaService,
    },
    {
      provide: SYMBOL_DATE_HELPER,
      useClass: DateHelper,
    },
    {
      provide: SYMBOL_CONVERTER,
      useClass: Converter,
    },
  ],
})
export class InfrastructureModule {}
