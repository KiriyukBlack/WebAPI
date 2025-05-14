import Koa from "koa";
import Router from "koa-router";
import bodyParser from "koa-bodyparser";
import logger from "koa-logger";
import json from "koa-json";
import { CustomErrorMessageFunction, query, body, validationResults } from "koa-req-validation";

const app = new Koa();
const router = new Router();

// Middleware
app.use(bodyParser());
app.use(logger());
app.use(json());

// Custom error message function
const customErrorMessage: CustomErrorMessageFunction = (_ctx, value) => {
    return `The name must be between 3 and 20 characters long but received length ${value.length}`;
};

// Validators
const validatorName = [
    body("name")
        .isLength({ min: 3 })
        .withMessage(customErrorMessage)
        .build(),
    body("id")
        .isInt({ min: 10000, max: 20000 })
        .build()
];

// GET / - Example endpoint with query validation
router.get('/', 
    query("name")
        .isLength({ min: 3 })
        .optional()
        .withMessage(customErrorMessage)
        .build(),
    async (ctx, next) => {
        const result = validationResults(ctx);
        if (result.hasErrors()) {
            ctx.status = 422; // Unprocessable Entity
            ctx.body = { err: result.mapped() };
        } else {
            ctx.body = { msg: `Hello world! ${ctx.query.name}` };
        }
        await next();
    }
);

// POST / - Example endpoint with body validation
router.post('/', ...validatorName, async (ctx, next) => {
    const result = validationResults(ctx);
    if (result.hasErrors()) {
        ctx.status = 422; // Unprocessable Entity
        ctx.body = { err: result.mapped() };
    } else {
        const { id, name } = ctx.request.body as { id: number; name: string }; // Type assertion
        ctx.body = { msg: `Received ID: ${id}, Name: ${name}` };
    }
    await next();
});

// 404 Error Handling Middleware
app.use(async (ctx, next) => {
    try {
        await next();
        if (ctx.status === 404) {
            ctx.status = 404;
            ctx.body = { err: "No such endpoint existed" };
        }
    } catch (err: any) { // Type assertion for error
        ctx.body = { err: err.message };
    }
});

// In-memory films array
let films: { id: number; name: string }[] = [
    { id: 1, name: "Inception" },
    { id: 2, name: "The Matrix" },
    { id: 3, name: "Interstellar" }
];

// Define an interface for the film
interface Film {
    id: number;
    name: string;
}

// GET /film - Return a list of films
router.get('/film', async (ctx) => {
    ctx.body = films;
});

// GET /film/:id - Return a film by id
router.get('/film/:id', async (ctx) => {
    const id = parseInt(ctx.params.id);
    const film = films.find(f => f.id === id);
    if (film) {
        ctx.body = film;
    } else {
        ctx.status = 404;
        ctx.body = { message: "Film not found" };
    }
});

// POST /film - Insert a new film
router.post('/film', async (ctx) => {
    const { id, name } = ctx.request.body as Film; // Type assertion
    if (id && name) {
        films.push({ id, name });
        ctx.status = 201; // Created
        ctx.body = { message: "Film added", film: { id, name } };
    } else {
        ctx.status = 400; // Bad Request
        ctx.body = { message: "Invalid film data" };
    }
});

// PUT /film - Update a film
router.put('/film', async (ctx) => {
    const { id, name } = ctx.request.body as Film; // Type assertion
    const filmIndex = films.findIndex(f => f.id === id);
    if (filmIndex !== -1 && name) {
        films[filmIndex].name = name;
        ctx.body = { message: "Film updated", film: films[filmIndex] };
    } else {
        ctx.status = 404; // Not Found
        ctx.body = { message: "Film not found or invalid data" };
    }
});

// Use the router
app.use(router.routes()).use(router.allowedMethods());

// Start the server
app.listen(10888, () => {
    console.log("Koa server started on http://localhost:10888");
});