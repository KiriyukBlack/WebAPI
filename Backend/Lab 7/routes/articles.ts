import Router, { RouterContext } from 'koa-router';
import { basicAuth } from '../controllers/auth';
import { validateArticle } from '../controllers/validation';
import bodyParser from 'koa-bodyparser';

const router = new Router({ prefix: '/api/v1/articles' });

const createArticle = async (ctx: RouterContext) => {
  ctx.body = { message: 'Article created' };
};

const updateArticle = async (ctx: RouterContext) => {
  ctx.body = { message: `Article ${ctx.params.id} updated` };
};

router.post('/', basicAuth, bodyParser(), validateArticle, createArticle);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), validateArticle, updateArticle);

export { router };