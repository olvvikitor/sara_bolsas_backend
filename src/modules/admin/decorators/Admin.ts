import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

export const Admin = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request:Request = ctx.switchToHttp().getRequest();
    if(!request.userData){
      throw new UnauthorizedException('Perfil de usuario não autorizado');

    }
    if(request.userData.type !== 'ADMIN'){
      throw new UnauthorizedException('Perfil de usuario não autorizado');
    }
    return request.userData;
  },
);
