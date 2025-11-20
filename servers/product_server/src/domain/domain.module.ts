import { Module } from '@nestjs/common';
import { Mapper, SYMBOL_MAPPER } from './Mapper.js';

@Module({
  exports: [SYMBOL_MAPPER],
  providers: [
    {
      provide: SYMBOL_MAPPER,
      useClass: Mapper,
    },
  ],
})
export class DomainModule {}
