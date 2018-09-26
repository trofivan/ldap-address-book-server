import Koa from 'koa';
import compose from 'koa-compose';

import { routes } from './middlewares/router';

const app = new Koa();

app.use(compose([routes]));

app.listen(3000);
