/* eslint-disable prettier/prettier */
import { Inject, Middleware } from '@midwayjs/decorator';
import { Context, NextFunction } from '@midwayjs/koa';
import { httpError } from '@midwayjs/core';
import { JwtService } from '@midwayjs/jwt';

@Middleware()
export class JwtMiddleware {
  @Inject()
  jwtService: JwtService;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      if (!ctx.headers['authorization']) {
        throw new httpError.UnauthorizedError();
        return;
      }
      const parts = ctx.get('authorization').trim().split(' ');

      if (parts.length === 2) {
        const scheme = parts[0];
        const token = parts[1];

        if (/^Bearer$/i.test(scheme)) {
          try {
            await this.jwtService.verify(token, {
              complete: true,
            });
          } catch (error) {
            const newToken = await this.jwtService.sign({admin:ctx.body}, 'wzc');
            ctx.set('Authorization', newToken);
          }
        }
      }
    };
  }
}
