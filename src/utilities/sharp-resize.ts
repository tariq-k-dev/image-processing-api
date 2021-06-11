import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const imgResize = (location: string): string[] => {
  // if the location string is empty, return empty array
  if (location.length === 0) return [];

  // replace Window's \ with /
  if (location.includes('\\')) {
    const locationFixed: string[] = [];

    for (let i = 0; i < location.length; i++) {
      if (location[i] === '\\') locationFixed[i] = '/';
      else locationFixed[i] = location[i];
    }

    location = locationFixed.join('');
  }

  const fileNamePath: string[] = location.split('/');
  const fileName: string = fileNamePath[fileNamePath.length - 1];
  const nameOnly: string = fileName.split('.')[0];
  const fileExt: string = fileName.split('.')[1];
  const outFolder = path.join('dist', 'output-images');
  let resizedFile = '';
  let outputFile = '';
  const imgSizes: string[] = [];

  // check if images already exist, if so use them and do not resize again
  const pathToTestImg = path.join(
    'dist',
    'output-images',
    nameOnly,
    nameOnly + '_2500.' + fileExt
  );
  const testImgExist = fs.existsSync(pathToTestImg);

  console.log({ testImgExist });

  if (testImgExist) {
    const images = fs.readdirSync(path.join('dist', 'output-images', nameOnly));
    // sort images by size
    const sortedImgs = images.sort((img1, img2): number => {
      const size1 = parseInt(img1.split('_')[1]);
      const size2 = parseInt(img2.split('_')[1]);

      if (isNaN(size1) || size1 < size2) return -1;
      else return 0;
    });

    sortedImgs.forEach((image) => {
      const imgPath = path.join('output-images', nameOnly, image);

      // exclude the original image
      if (image !== fileName) {
        imgSizes.push(imgPath);
      }
    });
  } else {
    // check that output folder exist
    if (!fs.existsSync(outFolder)) {
      fs.mkdirSync(outFolder);
    }

    // Resize original image
    try {
      resizedFile = nameOnly + '_100.' + fileExt;
      outputFile = path.resolve(path.join(outFolder, nameOnly, resizedFile));
      sharp(location).resize({ width: 100 }).toFile(outputFile);
      imgSizes.push(path.join('output-images', nameOnly, resizedFile));
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_300.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 300 }).toFile(outputFile);
      imgSizes.push(path.join('output-images', nameOnly, resizedFile));
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_500.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 500 }).toFile(outputFile);
      imgSizes.push(path.join('output-images', nameOnly, resizedFile));
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_750.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 750 }).toFile(outputFile);
      imgSizes.push(path.join('output-images', nameOnly, resizedFile));
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_1000.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 1000 }).toFile(outputFile);
      imgSizes.push(path.join('output-images', nameOnly, resizedFile));
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_1500.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 1500 }).toFile(outputFile);
      imgSizes.push(path.join('output-images', nameOnly, resizedFile));
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_2500.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 2500 }).toFile(outputFile);
      imgSizes.push(path.join('output-images', nameOnly, resizedFile));
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }
  }

  return imgSizes;
};

export default imgResize;
