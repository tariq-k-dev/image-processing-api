"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'fs';
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var localStorage_1 = __importDefault(require("localStorage"));
var imgResize = function (location) {
    // if the location string is empty, return empty array
    if (location.length === 0)
        return [];
    // replace Window's \ with /
    if (location.includes('\\')) {
        var locationFixed = [];
        for (var i = 0; i < location.length; i++) {
            if (location[i] === '\\')
                locationFixed[i] = '/';
            else
                locationFixed[i] = location[i];
        }
        location = locationFixed.join('');
    }
    var fileNamePath = location.split('/');
    var fileName = fileNamePath[fileNamePath.length - 1];
    var nameOnly = fileName.split('.')[0];
    var fileExt = fileName.split('.')[1];
    var outFolder = path_1.default.join('dist', 'output-images');
    var resizedFile = '';
    var outputFile = '';
    var imgSizes = [];
    // check if images already exist, if so use them and do not resize again
    // const pathToTestImg = path.join(
    //   'dist',
    //   'output-images',
    //   nameOnly,
    //   nameOnly + '_2500.' + fileExt
    // );
    // const testImgExist = fs.existsSync(pathToTestImg);
    // if (testImgExist) {
    //   const images = fs.readdirSync(path.join('dist', 'output-images', nameOnly));
    //   // sort images by size
    //   const sortedImgs = images.sort((img1, img2): number => {
    //     const size1 = parseInt(img1.split('_')[1]);
    //     const size2 = parseInt(img2.split('_')[1]);
    //     if (isNaN(size1) || size1 < size2) return -1;
    //     else return 0;
    //   });
    //   sortedImgs.forEach((image) => {
    //     const imgPath = path.join('output-images', nameOnly, image);
    //     // exclude the original image
    //     if (image !== fileName) {
    //       imgSizes.push(imgPath);
    //     }
    //   });
    // }
    if (localStorage_1.default.getItem(fileName) !== null) {
        var storedImages = localStorage_1.default;
        for (var _i = 0, _a = Object.values(storedImages); _i < _a.length; _i++) {
            var img = _a[_i];
            if (img !== fileName)
                imgSizes.push(img);
        }
    }
    else {
        localStorage_1.default.setItem(fileName, fileName);
        // Resize original image
        try {
            resizedFile = nameOnly + '_100.' + fileExt;
            outputFile = path_1.default.resolve(path_1.default.join(outFolder, nameOnly, resizedFile));
            sharp_1.default(location).resize({ width: 100 }).toFile(outputFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            localStorage_1.default.setItem(htmlImages, htmlImages);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_300.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 300 }).toFile(outputFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            localStorage_1.default.setItem(htmlImages, htmlImages);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_500.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 500 }).toFile(outputFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            localStorage_1.default.setItem(htmlImages, htmlImages);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_750.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 750 }).toFile(outputFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            localStorage_1.default.setItem(htmlImages, htmlImages);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_1000.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 1000 }).toFile(outputFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            localStorage_1.default.setItem(htmlImages, htmlImages);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_1500.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 1500 }).toFile(outputFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            localStorage_1.default.setItem(htmlImages, htmlImages);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_2500.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 2500 }).toFile(outputFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            localStorage_1.default.setItem(htmlImages, htmlImages);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
    }
    return imgSizes;
};
exports.default = imgResize;
