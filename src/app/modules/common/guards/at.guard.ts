import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);
    const isPublicApiKey = this.reflector.getAllAndOverride('isPublicApiKey', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }else{
      if(isPublicApiKey){
        const request = context.switchToHttp().getRequest();
        if (request && request.header('api-key')) {
          if(request.header('api-key')=='SKASDKJFS-8347HSKJFHJKFRE-54654'){
            return true;
          }else{
            return false;
          }
           
        }else{
            return false;
        }
      }
    }

    return super.canActivate(context);
  }
}
