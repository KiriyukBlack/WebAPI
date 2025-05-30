import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from '../models/articles.js';
// Create a new router with prefix for articles
const router = new Router({ prefix: '/api/v1/articles' });
// Temporarily define articles in an array
const articles = [
    { title: 'hello article', fullText: 'some text here to fill the body', creationDate: new Date().toISOString(), views: 0 },
    { title: 'another article', fullText: 'again here is some text here to fill', creationDate: new Date().toISOString(), views: 0 },
    { title: 'coventry university', fullText: 'some news about coventry university', creationDate: new Date().toISOString(), views: 0 },
    { title: 'smart campus', fullText: 'smart campus is coming to IVE', creationDate: new Date().toISOString(), views: 0 },
];
// Get all articles
// const getAll = async (ctx: RouterContext, next: any) => {
//     ctx.body = articles;
//     await next();
// };
// Get an article by id with validation
// const getById = async (ctx: RouterContext, next: any) => {
//     const id = parseInt(ctx.params.id, 10);
//     if (isNaN(id) || id < 1 || id > articles.length) {
//         ctx.status = 404;
//         ctx.body = { error: "Article not found" };
//         return;
//     }
//     ctx.body = articles[id - 1];
//     await next();
// };
// Create a new article
// const createArticle = async (ctx: RouterContext, next: any) => {
//     const { title, fullText } = ctx.request.body as Article;
//     if (!title || !fullText) {
//         ctx.status = 400;
//         ctx.body = { error: "Title and fullText are required" };
//         return;
//     }
//     const newArticle: Article = {
//         title,
//         fullText,
//         creationDate: new Date().toISOString(),
//         views: 0,
//     };
//     articles.push(newArticle);
//     ctx.status = 201;
//     ctx.body = newArticle;
//     await next();
// };
// Update an article by id
const updateArticle = async (ctx, next) => {
    const id = parseInt(ctx.params.id, 10);
    if (isNaN(id) || id < 1 || id > articles.length) {
        ctx.status = 404;
        ctx.body = { error: "Article not found" };
        return;
    }
    const { title, fullText } = ctx.request.body;
    if (!title || !fullText) {
        ctx.status = 400;
        ctx.body = { error: "Title and fullText are required" };
        return;
    }
    const updatedArticle = {
        title,
        fullText,
        creationDate: articles[id - 1].creationDate, // Keep the original creation date
        editedDate: new Date().toISOString(), // Set the edited date to now
        views: articles[id - 1].views, // Keep the original views count
    };
    articles[id - 1] = updatedArticle; // Update the article
    ctx.body = updatedArticle;
    await next();
};
// Delete an article by id
const deleteArticle = async (ctx, next) => {
    const id = parseInt(ctx.params.id, 10);
    if (isNaN(id) || id < 1 || id > articles.length) {
        ctx.status = 404;
        ctx.body = { error: "Article not found" };
        return;
    }
    articles.splice(id - 1, 1);
    ctx.status = 204; // No Content
    await next();
};
const getAll = async (ctx, next) => {
    let articles = await model.getAll();
    if (articles.length) {
        ctx.body = articles;
    }
    else {
        ctx.body = {};
    }
    await next();
};
const getById = async (ctx, next) => {
    let id = ctx.params.id;
    let article = await model.getById(id);
    if (article.length) {
        ctx.body = article[0];
    }
    else {
        ctx.status = 404;
    }
    await next();
};
const createArticle = async (ctx, next) => {
    const body = ctx.request.body;
    let result = await model.add(body);
    if (result.status == 201) {
        ctx.status = 201;
        ctx.body = body;
    }
    else {
        ctx.status = 500;
        ctx.body = { err: "insert data failed" };
    }
    await next();
};
// Define routes
router.get('/', getAll);
router.post('/', bodyParser(), createArticle);
router.get('/:id', getById);
router.put('/:id', bodyParser(), updateArticle);
router.delete('/:id', deleteArticle);
// 404 fallback for unmatched article routes
router.all('*', async (ctx) => {
    ctx.status = 404;
    ctx.body = { error: "No such endpoint existed" };
});
export { router };
