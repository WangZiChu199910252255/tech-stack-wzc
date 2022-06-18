import { MidwayConfig } from '@midwayjs/core';

export default {
  // use for cookie sign key, should change to your own and keep security
  keys: '1655475521261_4924',
  koa: {
    port: 7001,
  },
  jwt: {
    secret: 'keys',
    expiresIn: '2d',
  },
} as MidwayConfig;
