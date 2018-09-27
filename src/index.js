import Koa from 'koa';
import compose from 'koa-compose';
import config from 'config';

import { routes, allowedMethods } from './middlewares/router';
import errors from './middlewares/error';

const app = new Koa();

const PORT = config.get('server.port');

app.use(compose([
  errors,
  routes,
  allowedMethods
]));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
