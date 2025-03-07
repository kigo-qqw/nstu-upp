import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '../../user/entity/user.entity';

export const CurrentUser = createParamDecorator<User>(
  (_data: unknown, context: ExecutionContext): User => {
    console.log('CurrentUser');
    const request = context.switchToHttp().getRequest();
    console.log('request.user', request.user);
    return request.user;
  },
);
