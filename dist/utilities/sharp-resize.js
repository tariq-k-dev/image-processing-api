"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var imgResize = function (location) {
    // if the location string is empty, return empty array
    if (location.length === 0)
        return [];
    var fileNamePath = location.split('/');
    var fileName = fileNamePath[fileNamePath.length - 1];
    var nameOnly = fileName.split('.').slice(0, -1).join('');
    var fileExt = fileName.split('.').slice(-1);
    var descName = '';
    var outFile = path_1.default.resolve(path_1.default.join('dist', 'output-images', nameOnly, descName));
    var imgSizes = [];
    // Resize original image
    try {
        descName = nameOnly + '_100.' + fileExt;
        outFile = path_1.default.resolve('dist', 'output-images', nameOnly, descName);
        sharp_1.default(location).resize({ width: 100 }).toFile(outFile);
        imgSizes.push(path_1.default.join('output-images', nameOnly, descName));
    }
    catch (error) {
        console.error('Error occurred trying to resize image with sharp:', error);
    }
    try {
        descName = nameOnly + '_300.' + fileExt;
        outFile = path_1.default.resolve('dist', 'output-images', nameOnly, descName);
        sharp_1.default(location).resize({ width: 300 }).toFile(outFile);
        imgSizes.push(path_1.default.join('output-images', nameOnly, descName));
    }
    catch (error) {
        console.error('Error occurred trying to resize image with sharp:', error);
    }
    try {
        descName = nameOnly + '_500.' + fileExt;
        outFile = path_1.default.resolve('dist', 'output-images', nameOnly, descName);
        sharp_1.default(location).resize({ width: 500 }).toFile(outFile);
        imgSizes.push(path_1.default.join('output-images', nameOnly, descName));
    }
    catch (error) {
        console.error('Error occurred trying to resize image with sharp:', error);
    }
    try {
        descName = nameOnly + '_750.' + fileExt;
        outFile = path_1.default.resolve('dist', 'output-images', nameOnly, descName);
        sharp_1.default(location).resize({ width: 750 }).toFile(outFile);
        imgSizes.push(path_1.default.join('output-images', nameOnly, descName));
    }
    catch (error) {
        console.error('Error occurred trying to resize image with sharp:', error);
    }
    try {
        descName = nameOnly + '_1000.' + fileExt;
        outFile = path_1.default.resolve('dist', 'output-images', nameOnly, descName);
        sharp_1.default(location).resize({ width: 1000 }).toFile(outFile);
        imgSizes.push(path_1.default.join('output-images', nameOnly, descName));
    }
    catch (error) {
        console.error('Error occurred trying to resize image with sharp:', error);
    }
    try {
        descName = nameOnly + '_1500.' + fileExt;
        outFile = path_1.default.resolve('dist', 'output-images', nameOnly, descName);
        sharp_1.default(location).resize({ width: 1500 }).toFile(outFile);
        imgSizes.push(path_1.default.join('output-images', nameOnly, descName));
    }
    catch (error) {
        console.error('Error occurred trying to resize image with sharp:', error);
    }
    try {
        descName = nameOnly + '_2500.' + fileExt;
        outFile = path_1.default.resolve('dist', 'output-images', nameOnly, descName);
        sharp_1.default(location).resize({ width: 2500 }).toFile(outFile);
        imgSizes.push(path_1.default.join('output-images', nameOnly, descName));
    }
    catch (error) {
        console.error('Error occurred trying to resize image with sharp:', error);
    }
    return imgSizes;
};
exports.default = imgResize;
