"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'fs';
var path_1 = __importDefault(require("path"));
var sharp_1 = __importDefault(require("sharp"));
var node_cache_1 = __importDefault(require("node-cache"));
var imgCache = new node_cache_1.default();
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
    // Check to see if images already exist in cache
    if (imgCache.get(nameOnly)) {
        var imgFiles = imgCache.get(nameOnly);
        return imgFiles;
    }
    else {
        // Resize original image
        try {
            resizedFile = nameOnly + '_100.' + fileExt;
            outputFile = path_1.default.resolve(path_1.default.join(outFolder, nameOnly, resizedFile));
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            sharp_1.default(location).resize({ width: 100 }).toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_300.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            sharp_1.default(location).resize({ width: 300 }).toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_500.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            sharp_1.default(location).resize({ width: 500 }).toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_750.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            sharp_1.default(location).resize({ width: 750 }).toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_1000.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            var format = fileExt;
            sharp_1.default(location)
                .resize({ width: 1000 })
                .toFormat(format, {
                quality: 60,
            })
                .toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_1500.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            var format = fileExt;
            sharp_1.default(location)
                .resize({ width: 1500 })
                .toFormat(format, {
                quality: 60,
            })
                .toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_2500.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            var htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            var format = fileExt;
            imgSizes.push(htmlImages);
            sharp_1.default(location)
                .resize({ width: 2500 })
                .toFormat(format, {
                quality: 60,
            })
                .toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
    }
    // cache the images with file name as key
    imgCache.set(nameOnly, imgSizes);
    return imgSizes;
};
exports.default = imgResize;
