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
const router = new koa_router_1.default({ prefix: '/api/v1/articles' });
exports.router = router;
const articles = [
    { title: 'hello article', fullText: 'some text here to fill the body' },
    { title: 'another article', fullText: 'again here is some text here to fill' },
    { title: 'coventry university ', fullText: 'some news about coventry university' },
    { title: 'smart campus', fullText: 'smart campus is coming to IVE' }
];
const getAll = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
});
const getById = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = +ctx.params.id;
    if ((id < articles.length + 1) && (id > 0)) {
        ctx.body = articles[id - 1];
    }
    else {
        ctx.status = 404;
    }
    yield next();
});
const createArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let article = ctx.request.body;
    let newArticle = { title: article.title, fullText: article.fullText };
    console.log(newArticle);
    articles.push(newArticle);
    ctx.status = 201;
    ctx.body = newArticle;
    yield next();
});
const updateArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = +ctx.params.id;
    let article = ctx.request.body;
    let updateArticle = { title: article.title, fullText: article.fullText };
    if ((id <= articles.length) && id > 0) {
        articles[id - 1].title = updateArticle.title;
        articles[id - 1].fullText = updateArticle.fullText;
    }
    else {
        ctx.status = 404;
    }
});
const deleteArticle = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = +ctx.params.id;
    if ((id <= articles.length) && id > 0) {
        articles.splice(id - 1, 1);
        ctx.body = {
            message: "Article delete"
        };
    }
    else {
        ctx.status = 404;
    }
    yield next();
});
router.get('/', getAll);
router.get('/:id([0-9]{1,})', getById);
router.post('/', koa_bodyparser_1.default, createArticle);
router.put('/:id([0-9]{1,})', koa_bodyparser_1.default, updateArticle);
router.del('/:id([0-9]{1,})', deleteArticle);
