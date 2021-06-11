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
app.use(serve_favicon_1.default(path_1.default.resolve('dist', 'images', 'favicon.ico')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.set('../views', path_1.default.join(__dirname, '../views'));
app.set('view engine', 'pug');
app.use(express_1.default.static('dist'));
app.use(index_1.default);
app.listen(PORT, function () {
    console.log("Listening at " + (HOST + PORT));
});
exports.default = app;
