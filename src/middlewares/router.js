import Router from 'koa-router';

import {getCompanies, getCompany} from '../controllers/companies';
import {getUsers, getUser} from '../controllers/users';

const router = new Router();

router
  // Companies
  .get('/companies', getCompanies)
  .get('/companies/:id', getCompany)

  // Users
  .get('/users', getUsers)
  .get('/users/:id', getUser)

  // 404
  .get('*', (ctx) => ctx.throw(404, 'Resource not found'));

export const routes = router.routes();
export const allowedMethods = router.allowedMethods();
