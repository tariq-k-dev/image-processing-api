"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const index_1 = __importDefault(require("./routes/index"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const HOST = 'http://localhost:';
app.use((0, serve_favicon_1.default)(path_1.default.resolve('dist', 'images', 'favicon.ico')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('../views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
// set up rate limiter: maximum of five requests per minute
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter, express_1.default.static('dist'));
app.use(limiter, index_1.default);
app.listen(PORT, () => {
    console.log(`Listening at ${HOST + PORT}`);
});
exports.default = app;
