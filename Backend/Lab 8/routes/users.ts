import Router from 'koa-router';
import { basicAuth } from '../controllers/auth';

const router = new Router({ prefix: '/api/v1/users' });

router.delete('/:id', basicAuth, async (ctx) => {
  ctx.body = { message: `User ${ctx.params.id} deleted` };
});

export { router };