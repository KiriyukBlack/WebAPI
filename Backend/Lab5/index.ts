import Koa from "koa";
import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";
import bodyParser from "koa-bodyparser"; // Import bodyParser
import { router as articles } from "./routes/articles"; // Import the articles router

// Create a new Koa application
const app: Koa = new Koa();

// Create a new Router instance
const router: Router = new Router();

// Middleware function to handle the welcome message
const welcomeAPI = async (ctx: RouterContext, next: any) => {
    ctx.body = {
        message: "Welcome to the blog API!"
    };
    await next();
}

// Define a GET endpoint for the API
router.get('/api/v1', welcomeAPI);

// Use middleware for logging and JSON response formatting
app.use(logger());
app.use(json());
app.use(bodyParser()); // Use bodyParser middleware to parse request bodies

// Use the articles routes
app.use(articles.routes());
app.use(articles.allowedMethods()); // Allow methods for articles routes

// Use the router's routes
app.use(router.routes());

// Start the server and listen on port 10888
app.listen(10888, () => {
    console.log("Server is running on http://localhost:10888");
});
