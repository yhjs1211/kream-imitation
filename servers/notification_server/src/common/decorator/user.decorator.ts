import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface User {
  email: string;
  name: string;
  role: 'USER' | 'ADMIN';
  auth_time: number;
  iat: number;
  exp: number;
  aud: string;
  iss: string;
}

export const User = createParamDecorator((data: unknown, ctx: ExecutionContext): User => {
  const req = ctx.switchToHttp().getRequest();

  return req.user;
});
