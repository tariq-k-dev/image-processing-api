"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var serve_favicon_1 = __importDefault(require("serve-favicon"));
var index_1 = __importDefault(require("./routes/index"));
var app = express_1.default();
var PORT = process.env.PORT || 3000;
var HOST = 'http://localhost:';
// serve static files and caching
// https://expressjs.com/en/api.html#example.of.express.static
var options = {
    etag: true,
    maxAge: '7d',
    redirect: false,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now().toLocaleString());
    },
};
app.use(serve_favicon_1.default(path_1.default.resolve('dist', 'images', 'favicon.ico')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('../views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express_1.default.static('dist', options));
app.use(index_1.default);
app.listen(PORT, function () {
    console.log("Listening at " + (HOST + PORT));
});
exports.default = app;
