import Koa from 'koa';
import compose from 'koa-compose';

import { routes, allowedMethods } from './middlewares/router';
import errors from './middlewares/error';

const app = new Koa();

app.use(compose([
  errors,
  routes,
  allowedMethods
]));

app.listen(3000);
