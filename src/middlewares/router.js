import Router from 'koa-router';

import { getCompanies } from '../controllers/companies';
import { getUsers, getUser } from '../controllers/users';

const router = new Router();

router
  .get('/', (ctx) => {
    ctx.body = {
      get_users: `${ctx.request.href}users`,
      get_user: `${ctx.request.href}users/{dn}`,
      get_companies: `${ctx.request.href}companies`
    };
  })
  .get('/companies', getCompanies)
  .get('/users', getUsers)
  .get('/users/:dn', getUser)
  .get('*', (ctx) => ctx.throw(404, 'Resource not found'));

export const routes = router.routes();
export const allowedMethods = router.allowedMethods();
