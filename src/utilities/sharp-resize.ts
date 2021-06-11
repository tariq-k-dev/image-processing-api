// import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import NodeCache from 'node-cache';

const imgCache = new NodeCache();

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

  // Check to see if images already exist in cache
  if (imgCache.get(nameOnly)) {
    const imgFiles: string[] = imgCache.get(nameOnly) as string[];

    return imgFiles;
  } else {
    // Add fileName to localStorage to use for search for processed images
    imgCache.set(fileName, fileName);
    // Resize original image
    try {
      resizedFile = nameOnly + '_100.' + fileExt;
      outputFile = path.resolve(path.join(outFolder, nameOnly, resizedFile));
      sharp(location).resize({ width: 100 }).toFile(outputFile);
      const htmlImages = path.join('output-images', nameOnly, resizedFile);
      imgSizes.push(htmlImages);
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_300.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 300 }).toFile(outputFile);
      const htmlImages = path.join('output-images', nameOnly, resizedFile);
      imgSizes.push(htmlImages);
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_500.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 500 }).toFile(outputFile);
      const htmlImages = path.join('output-images', nameOnly, resizedFile);
      imgSizes.push(htmlImages);
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_750.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 750 }).toFile(outputFile);
      const htmlImages = path.join('output-images', nameOnly, resizedFile);
      imgSizes.push(htmlImages);
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_1000.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 1000 }).toFile(outputFile);
      const htmlImages = path.join('output-images', nameOnly, resizedFile);
      imgSizes.push(htmlImages);
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_1500.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 1500 }).toFile(outputFile);
      const htmlImages = path.join('output-images', nameOnly, resizedFile);
      imgSizes.push(htmlImages);
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }

    try {
      resizedFile = nameOnly + '_2500.' + fileExt;
      outputFile = path.join(outFolder, nameOnly, resizedFile);
      sharp(location).resize({ width: 2500 }).toFile(outputFile);
      const htmlImages = path.join('output-images', nameOnly, resizedFile);
      imgSizes.push(htmlImages);
    } catch (error) {
      console.error('Error occurred trying to resize image with sharp:', error);
    }
  }

  // cache the images with file name as key
  imgCache.set(nameOnly, imgSizes);

  return imgSizes;
};

export default imgResize;
