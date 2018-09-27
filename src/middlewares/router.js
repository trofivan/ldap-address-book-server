import Router from 'koa-router';

import { getCompanies, getCompany } from '../controllers/companies';

const router = new Router();

router
  .get('/companies', getCompanies)
  .get('/companies/:id', getCompany)

  .get('/users', () => {
  })
  .get('/users/:id', () => {
  })

  .get('*', (ctx) => ctx.throw(404, 'Resource not found'));

export const routes = router.routes();
export const allowedMethods = router.allowedMethods();
