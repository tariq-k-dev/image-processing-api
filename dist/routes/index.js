"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const adm_zip_1 = __importDefault(require("adm-zip"));
const sharp_resize_1 = __importDefault(require("../utilities/sharp-resize"));
const routes = express_1.default.Router();
// Multer for file disk storage
let imgUrl = '';
let folderName = '';
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        folderName = file.originalname.split('.')[0];
        const folderPath = path_1.default.join('dist', 'output-images', folderName);
        if (!fs_1.default.existsSync(folderPath)) {
            fs_1.default.mkdirSync(folderPath, { recursive: true });
        }
        cb(null, folderPath);
        imgUrl = path_1.default.join(folderPath, file.originalname);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = (0, multer_1.default)({ storage: storage });
/* GET home page. */
routes.get('/', (req, res) => {
    res.render('index', {
        title: 'Image Sizer',
        h1Text: 'Web Image Size Generator',
        pText: 'Upload and resize an image to get the most common sizes used for the web',
    });
});
// route to display resized images
routes.post('/processed-images', upload.single('imageupload'), (req, res) => {
    let resizedImgs = [];
    try {
        resizedImgs = (0, sharp_resize_1.default)(imgUrl);
        if (resizedImgs.length === 7) {
            setTimeout(() => {
                res.render('processed-images', {
                    title: 'Image Sizer',
                    h1Text: 'Web Image Size Generator',
                    pText: 'Upload and resize an image to get the most common sizes used for the web',
                    imgUrls: resizedImgs,
                });
            }, 600);
        }
    }
    catch (err) {
        console.error('Image resizing error:', err);
    }
});
// route to handle zip download of resized images
routes.get('/zip-download', async (req, res) => {
    const pathToImages = path_1.default.resolve('dist', 'output-images', folderName);
    const uploadDir = fs_1.default.readdirSync(pathToImages);
    const zip = new adm_zip_1.default();
    for (let i = 0; i < uploadDir.length; i++) {
        zip.addLocalFile(pathToImages + '/' + uploadDir[i]);
    }
    // Define zip file name
    const downloadName = `${folderName}.zip`;
    const data = zip.toBuffer();
    const dataLength = data.length;
    // code to download zip file
    res.set('Content-Type', 'application/octet-stream');
    res.set('Content-Disposition', `attachment; filename=${downloadName}`);
    res.set('Content-Length', dataLength.toString());
    res.send(data);
});
exports.default = routes;
