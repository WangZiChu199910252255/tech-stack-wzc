import { Configuration, App } from '@midwayjs/decorator';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import AppDataSource from './db';
import * as jwt from '@midwayjs/jwt';
// import { DefaultErrorFilter } from './filter/default.filter';
// import { NotFoundFilter } from './filter/notfound.filter';
import { ReportMiddleware } from './middleware/report.middleware';

@Configuration({
  imports: [
    koa,
    validate,
    jwt,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;
  async onReady() {
    AppDataSource.initialize()
      .then(() => {
        console.log('mysql 连接成功');
      })
      .catch(error => console.log(error));
    // add middleware
    this.app.useMiddleware([ReportMiddleware]);

    // add filter
    // this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}
