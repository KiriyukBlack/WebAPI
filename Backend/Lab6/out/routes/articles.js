"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
// Create a new router with prefix for articles
const router = new koa_router_1.default({ prefix: '/api/v1/articles' });
exports.router = router;
// Temporarily define articles in an array
const articles = [
    { title: 'hello article', fullText: 'some text here to fill the body', creationDate: new Date().toISOString(), views: 0 },
    { title: 'another article', fullText: 'again here is some text here to fill', creationDate: new Date().toISOString(), views: 0 },
    { title: 'coventry university', fullText: 'some news about coventry university', creationDate: new Date().toISOString(), views: 0 },
    { title: 'smart campus', fullText: 'smart campus is coming to IVE', creationDate: new Date().toISOString(), views: 0 },
];
// Get all articles
const getAll = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = articles;
    yield next();
});
// Get an article by id with validation
const getById = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(ctx.params.id, 10);
    if (isNaN(id) || id < 1 || id > articles.length) {
        ctx.status = 404;
        ctx.body = { error: "Article not found" };
        return;
    }
    ctx.body = articles[id - 1];
    yield next();
});
// Create a new article
const createArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, fullText } = ctx.request.body;
    if (!title || !fullText) {
        ctx.status = 400;
        ctx.body = { error: "Title and fullText are required" };
        return;
    }
    const newArticle = {
        title,
        fullText,
        creationDate: new Date().toISOString(),
        views: 0,
    };
    articles.push(newArticle);
    ctx.status = 201;
    ctx.body = newArticle;
    yield next();
});
// Update an article by id
const updateArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
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
    yield next();
});
// Delete an article by id
const deleteArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(ctx.params.id, 10);
    if (isNaN(id) || id < 1 || id > articles.length) {
        ctx.status = 404;
        ctx.body = { error: "Article not found" };
        return;
    }
    articles.splice(id - 1, 1);
    ctx.status = 204; // No Content
    yield next();
});
// Define routes
router.get('/', getAll);
router.post('/', (0, koa_bodyparser_1.default)(), createArticle);
router.get('/:id', getById);
router.put('/:id', (0, koa_bodyparser_1.default)(), updateArticle);
router.delete('/:id', deleteArticle);
// 404 fallback for unmatched article routes
router.all('*', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.status = 404;
    ctx.body = { error: "No such endpoint existed" };
}));
