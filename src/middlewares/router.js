import Router from 'koa-router';

const router = new Router();

router
  .get('/', () => {})

  .get('/companies', () => {})
  .get('/companies/:id', () => {})

  .get('/users', () => {})
  .get('/users/:id', () => {});

export const routes = router.routes();
export const allowedMethods = router.allowedMethods();
