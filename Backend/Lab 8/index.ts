import Koa from 'koa';
import logger from 'koa-logger';
import json from 'koa-json';
import Router from 'koa-router';
import passport from 'koa-passport';
import serve from 'koa-static';
import { router as specialRouter } from './routes/special';
import { router as articlesRouter } from './routes/articles';
import path from 'path';

const app = new Koa();
const router = new Router();


app.use(passport.initialize());
app.use(specialRouter.routes()).use(specialRouter.allowedMethods());
app.use(articlesRouter.routes()).use(articlesRouter.allowedMethods());
app.use(serve(path.join(__dirname, 'docs')));
app.use(serve('./docs'));

app.listen(3000, () => {
  console.log('Server running on port 3000');
});