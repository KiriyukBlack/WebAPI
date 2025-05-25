import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser";
import { router as articles } from "./routes/articles.js";
import { sequelize } from "./helpers/database.js";

const app: Koa = new Koa();
const router: Router = new Router();

const welcomeAPI = async (ctx: RouterContext, next: any) => {
    ctx.body = {
        message: "Welcome to the blog API!"
    };
    await next();
}

router.get('/api/v1', welcomeAPI);

app.use(logger());
app.use(json());
app.use(bodyParser());

app.use(articles.routes());
app.use(articles.allowedMethods());

app.use(router.routes());

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
    .then(() => {
        console.log("Database connected");
        return sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err: Error) => {
        console.error("Database connection error:", err);
    });