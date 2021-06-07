"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
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
    if (fs_1.default.existsSync(path_1.default.join('dist', 'output-images', nameOnly))) {
        // Resize original image
        try {
            resizedFile = nameOnly + '_100.' + fileExt;
            outputFile = path_1.default.resolve(path_1.default.join(outFolder, nameOnly, resizedFile));
            sharp_1.default(location).resize({ width: 100 }).toFile(outputFile);
            imgSizes.push(path_1.default.join('output-images', nameOnly, resizedFile));
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_300.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 300 }).toFile(outputFile);
            imgSizes.push(path_1.default.join('output-images', nameOnly, resizedFile));
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_500.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 500 }).toFile(outputFile);
            imgSizes.push(path_1.default.join('output-images', nameOnly, resizedFile));
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_750.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 750 }).toFile(outputFile);
            imgSizes.push(path_1.default.join('output-images', nameOnly, resizedFile));
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_1000.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 1000 }).toFile(outputFile);
            imgSizes.push(path_1.default.join('output-images', nameOnly, resizedFile));
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_1500.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 1500 }).toFile(outputFile);
            imgSizes.push(path_1.default.join('output-images', nameOnly, resizedFile));
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_2500.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            sharp_1.default(location).resize({ width: 2500 }).toFile(outputFile);
            imgSizes.push(path_1.default.join('output-images', nameOnly, resizedFile));
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
    }
    return imgSizes;
};
exports.default = imgResize;
