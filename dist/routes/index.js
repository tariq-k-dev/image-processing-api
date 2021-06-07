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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var multer_1 = __importDefault(require("multer"));
var adm_zip_1 = __importDefault(require("adm-zip"));
var sharp_resize_1 = __importDefault(require("../utilities/sharp-resize"));
var routes = express_1.default.Router();
// Multer for file disk storage
var imgUrl = '';
var folderName = '';
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        // clear output-images folder for each new image that is input
        try {
            fs_1.default.rmdirSync('dist/output-images', { recursive: true });
            fs_1.default.mkdirSync('dist/output-images', { recursive: true });
        }
        catch (err) {
            console.error('Error deleting output-images folder:', err);
        }
        folderName = file.originalname.split('.')[0];
        var folderPath = path_1.default.join('dist', 'output-images', folderName);
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath);
        }
        cb(null, folderPath);
        imgUrl = path_1.default.join(folderPath, file.originalname);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
var upload = multer_1.default({ storage: storage });
/* GET home page. */
routes.get('/', function (req, res) {
    res.render('index', {
        title: 'Image Sizer',
        h1Text: 'Web Image Size Generator',
        pText: 'Upload and resize an image to get the most common sizes used for the web',
    });
});
// route to display resized images
routes.post('/processed-images', upload.single('imageupload'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var resizedImgs;
    return __generator(this, function (_a) {
        resizedImgs = sharp_resize_1.default(imgUrl);
        // give a little delay for image to be processed
        setTimeout(function () {
            res.render('processed-images', {
                title: 'Image Sizer',
                h1Text: 'Web Image Size Generator',
                pText: 'Upload and resize an image to get the most common sizes used for the web',
                imgUrls: resizedImgs,
            });
        }, 0);
        return [2 /*return*/];
    });
}); });
// route to handle zip download of resized images
routes.get('/zip-download', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var pathToImages, uploadDir, zip, i, downloadName, data, dataLength;
    return __generator(this, function (_a) {
        pathToImages = path_1.default.resolve('dist', 'output-images', folderName);
        uploadDir = fs_1.default.readdirSync(pathToImages);
        zip = new adm_zip_1.default();
        for (i = 0; i < uploadDir.length; i++) {
            zip.addLocalFile(pathToImages + '/' + uploadDir[i]);
        }
        downloadName = folderName + ".zip";
        data = zip.toBuffer();
        dataLength = data.length;
        // code to download zip file
        res.set('Content-Type', 'application/octet-stream');
        res.set('Content-Disposition', "attachment; filename=" + downloadName);
        res.set('Content-Length', dataLength.toString());
        res.send(data);
        return [2 /*return*/];
    });
}); });
exports.default = routes;
