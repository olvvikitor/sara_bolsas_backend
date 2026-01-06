import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const Admin = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    if(request.userData.type !== 'ADMIN'){
      throw new UnauthorizedException('Perfil de usuario não autorizado');
    }
    return request.userData;
  },
);
