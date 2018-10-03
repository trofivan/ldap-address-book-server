import Koa from 'koa';
import compose from 'koa-compose';
import config from 'config';

import {routes, allowedMethods} from './middlewares/router';
import errors from './middlewares/error';

const PORT = config.get('app.port');
const app = new Koa();

app.use(compose([
  errors,
  routes,
  allowedMethods
]));
// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
