import express from 'express';
import fs from 'fs';
import path from 'path';
import multer from 'multer';
import AdmZip from 'adm-zip';
import imgResize from '../utilities/sharp-resize';

const routes = express.Router();

// Multer for file disk storage
let imgUrl = '';
let folderName = '';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // clear output-images folder for each new image that is input
    try {
      fs.rmdirSync('dist/output-images', { recursive: true });
      fs.mkdirSync('dist/output-images', { recursive: true });
    } catch (err) {
      console.error('Error deleting output-images folder:', err);
    }

    folderName = file.originalname.split('.')[0];
    const folderPath = path.join('dist', 'output-images', folderName);

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    cb(null, folderPath);

    imgUrl = path.join(folderPath, file.originalname);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

/* GET home page. */
routes.get('/', (req, res) => {
  res.render('index', {
    title: 'Image Sizer',
    h1Text: 'Web Image Size Generator',
    pText:
      'Upload and resize an image to get the most common sizes used for the web',
  });
});

// route to display resized images
routes.post(
  '/processed-images',
  upload.single('imageupload'),
  async (req, res) => {
    const resizedImgs: string[] | null = imgResize(imgUrl);

    await res.render('processed-images', {
      title: 'Image Sizer',
      h1Text: 'Web Image Size Generator',
      pText:
        'Upload and resize an image to get the most common sizes used for the web',
      imgUrls: resizedImgs,
    });
  }
);

// route to handle zip download of resized images
routes.get('/zip-download', async (req, res) => {
  const pathToImages = path.resolve('dist', 'output-images', folderName);
  const uploadDir = fs.readdirSync(pathToImages);
  const zip = new AdmZip();

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

export default routes;
