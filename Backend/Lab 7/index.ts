import Koa from 'koa';
import Router from 'koa-router';
import passport from 'koa-passport';
import { router as specialRouter } from './routes/special';
import { router as articlesRouter } from './routes/articles';

const app = new Koa();
const router = new Router();

app.use(passport.initialize());
app.use(specialRouter.routes()).use(specialRouter.allowedMethods());
app.use(articlesRouter.routes()).use(articlesRouter.allowedMethods());

app.listen(3000, () => {
  console.log('Server running on port 3000');
});