import { Injectable } from '@nestjs/common';

interface ContructableClass<T> {
  new (data: any): T;
}

@Injectable()
export class Mapper {
  constructor() {}

  mapToEntity<T>(data: any, Entity: ContructableClass<T>): T {
    return new Entity(data);
  }

  mapToVO<T>(data: any, VO: ContructableClass<T>): T {
    return new VO(data);
  }
}

export const SYMBOL_MAPPER = Symbol('MAPPER');
