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
const koa_1 = __importDefault(require("koa"));
const koa_router_1 = __importDefault(require("koa-router"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser"));
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_req_validation_1 = require("koa-req-validation");
const app = new koa_1.default();
const router = new koa_router_1.default();
// Middleware
app.use((0, koa_bodyparser_1.default)());
app.use((0, koa_logger_1.default)());
app.use((0, koa_json_1.default)());
// Custom error message function
const customErrorMessage = (_ctx, value) => {
    return `The name must be between 3 and 20 characters long but received length ${value.length}`;
};
// Validators
const validatorName = [
    (0, koa_req_validation_1.body)("name")
        .isLength({ min: 3 })
        .withMessage(customErrorMessage)
        .build(),
    (0, koa_req_validation_1.body)("id")
        .isInt({ min: 10000, max: 20000 })
        .build()
];
// GET / - Example endpoint with query validation
router.get('/', (0, koa_req_validation_1.query)("name")
    .isLength({ min: 3 })
    .optional()
    .withMessage(customErrorMessage)
    .build(), (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, koa_req_validation_1.validationResults)(ctx);
    if (result.hasErrors()) {
        ctx.status = 422; // Unprocessable Entity
        ctx.body = { err: result.mapped() };
    }
    else {
        ctx.body = { msg: `Hello world! ${ctx.query.name}` };
    }
    yield next();
}));
// POST / - Example endpoint with body validation
router.post('/', ...validatorName, (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = (0, koa_req_validation_1.validationResults)(ctx);
    if (result.hasErrors()) {
        ctx.status = 422; // Unprocessable Entity
        ctx.body = { err: result.mapped() };
    }
    else {
        const { id, name } = ctx.request.body; // Type assertion
        ctx.body = { msg: `Received ID: ${id}, Name: ${name}` };
    }
    yield next();
}));
// 404 Error Handling Middleware
app.use((ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield next();
        if (ctx.status === 404) {
            ctx.status = 404;
            ctx.body = { err: "No such endpoint existed" };
        }
    }
    catch (err) { // Type assertion for error
        ctx.body = { err: err.message };
    }
}));
// In-memory films array
let films = [
    { id: 1, name: "Inception" },
    { id: 2, name: "The Matrix" },
    { id: 3, name: "Interstellar" }
];
// GET /film - Return a list of films
router.get('/film', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = films;
}));
// GET /film/:id - Return a film by id
router.get('/film/:id', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(ctx.params.id);
    const film = films.find(f => f.id === id);
    if (film) {
        ctx.body = film;
    }
    else {
        ctx.status = 404;
        ctx.body = { message: "Film not found" };
    }
}));
// POST /film - Insert a new film
router.post('/film', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = ctx.request.body; // Type assertion
    if (id && name) {
        films.push({ id, name });
        ctx.status = 201; // Created
        ctx.body = { message: "Film added", film: { id, name } };
    }
    else {
        ctx.status = 400; // Bad Request
        ctx.body = { message: "Invalid film data" };
    }
}));
// PUT /film - Update a film
router.put('/film', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name } = ctx.request.body; // Type assertion
    const filmIndex = films.findIndex(f => f.id === id);
    if (filmIndex !== -1 && name) {
        films[filmIndex].name = name;
        ctx.body = { message: "Film updated", film: films[filmIndex] };
    }
    else {
        ctx.status = 404; // Not Found
        ctx.body = { message: "Film not found or invalid data" };
    }
}));
// Use the router
app.use(router.routes()).use(router.allowedMethods());
// Start the server
app.listen(10888, () => {
    console.log("Koa server started on http://localhost:10888");
});
