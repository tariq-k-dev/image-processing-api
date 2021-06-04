import path from 'path';
import sharp from 'sharp';

const imgResize = (location: string): string[] => {
  // if the location string is empty, return empty array
  if (location.length === 0) return [];

  const fileNamePath = location.split('/');
  const fileName = fileNamePath[fileNamePath.length - 1];
  const nameOnly = fileName.split('.').slice(0, -1).join('');
  const fileExt = fileName.split('.').slice(-1);
  let descName = '';
  let outFile = path.resolve(
    path.join('dist', 'output-images', nameOnly, descName)
  );
  const imgSizes: string[] = [];

  // Resize original image
  try {
    descName = nameOnly + '_100.' + fileExt;
    outFile = path.resolve('dist', 'output-images', nameOnly, descName);
    sharp(location).resize({ width: 100 }).toFile(outFile);
    imgSizes.push(path.join('output-images', nameOnly, descName));
  } catch (error) {
    console.error('Error occurred trying to resize image with sharp:', error);
  }

  try {
    descName = nameOnly + '_300.' + fileExt;
    outFile = path.resolve('dist', 'output-images', nameOnly, descName);
    sharp(location).resize({ width: 300 }).toFile(outFile);
    imgSizes.push(path.join('output-images', nameOnly, descName));
  } catch (error) {
    console.error('Error occurred trying to resize image with sharp:', error);
  }

  try {
    descName = nameOnly + '_500.' + fileExt;
    outFile = path.resolve('dist', 'output-images', nameOnly, descName);
    sharp(location).resize({ width: 500 }).toFile(outFile);
    imgSizes.push(path.join('output-images', nameOnly, descName));
  } catch (error) {
    console.error('Error occurred trying to resize image with sharp:', error);
  }

  try {
    descName = nameOnly + '_750.' + fileExt;
    outFile = path.resolve('dist', 'output-images', nameOnly, descName);
    sharp(location).resize({ width: 750 }).toFile(outFile);
    imgSizes.push(path.join('output-images', nameOnly, descName));
  } catch (error) {
    console.error('Error occurred trying to resize image with sharp:', error);
  }

  try {
    descName = nameOnly + '_1000.' + fileExt;
    outFile = path.resolve('dist', 'output-images', nameOnly, descName);
    sharp(location).resize({ width: 1000 }).toFile(outFile);
    imgSizes.push(path.join('output-images', nameOnly, descName));
  } catch (error) {
    console.error('Error occurred trying to resize image with sharp:', error);
  }

  try {
    descName = nameOnly + '_1500.' + fileExt;
    outFile = path.resolve('dist', 'output-images', nameOnly, descName);
    sharp(location).resize({ width: 1500 }).toFile(outFile);
    imgSizes.push(path.join('output-images', nameOnly, descName));
  } catch (error) {
    console.error('Error occurred trying to resize image with sharp:', error);
  }

  try {
    descName = nameOnly + '_2500.' + fileExt;
    outFile = path.resolve('dist', 'output-images', nameOnly, descName);
    sharp(location).resize({ width: 2500 }).toFile(outFile);
    imgSizes.push(path.join('output-images', nameOnly, descName));
  } catch (error) {
    console.error('Error occurred trying to resize image with sharp:', error);
  }

  return imgSizes;
};

export default imgResize;
