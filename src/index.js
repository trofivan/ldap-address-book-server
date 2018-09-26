import Koa from 'koa';
import compose from 'koa-compose';

import { routes, allowedMethods } from './middlewares/router';

const app = new Koa();

app.use(compose([
  routes,
  allowedMethods
]));

app.listen(3000);
