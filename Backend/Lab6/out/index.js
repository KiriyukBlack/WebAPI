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
const koa_logger_1 = __importDefault(require("koa-logger"));
const koa_json_1 = __importDefault(require("koa-json"));
const koa_bodyparser_1 = __importDefault(require("koa-bodyparser")); // Import bodyParser
const articles_1 = require("./routes/articles"); // Import the articles router
// Create a new Koa application
const app = new koa_1.default();
// Create a new Router instance
const router = new koa_router_1.default();
// Middleware function to handle the welcome message
const welcomeAPI = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    ctx.body = {
        message: "Welcome to the blog API!"
    };
    yield next();
});
// Define a GET endpoint for the API
router.get('/api/v1', welcomeAPI);
// Use middleware for logging and JSON response formatting
app.use((0, koa_logger_1.default)());
app.use((0, koa_json_1.default)());
app.use((0, koa_bodyparser_1.default)()); // Use bodyParser middleware to parse request bodies
// Use the articles routes
app.use(articles_1.router.routes());
app.use(articles_1.router.allowedMethods()); // Allow methods for articles routes
// Use the router's routes
app.use(router.routes());
// Start the server and listen on port 10888
app.listen(10888, () => {
    console.log("Server is running on http://localhost:10888");
});
