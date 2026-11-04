"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import fs from 'fs';
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const node_cache_1 = __importDefault(require("node-cache"));
const imgCache = new node_cache_1.default();
const imgResize = (location) => {
    // if the location string is empty, return empty array
    if (location.length === 0)
        return [];
    // replace Window's \ with /
    if (location.includes('\\')) {
        const locationFixed = [];
        for (let i = 0; i < location.length; i++) {
            if (location[i] === '\\')
                locationFixed[i] = '/';
            else
                locationFixed[i] = location[i];
        }
        location = locationFixed.join('');
    }
    const fileNamePath = location.split('/');
    const fileName = fileNamePath[fileNamePath.length - 1];
    const nameOnly = fileName.split('.')[0];
    const fileExt = fileName.split('.')[1];
    const outFolder = path_1.default.join('dist', 'output-images');
    let resizedFile = '';
    let outputFile = '';
    const imgSizes = [];
    // Check to see if images already exist in cache
    if (imgCache.get(nameOnly)) {
        const imgFiles = imgCache.get(nameOnly);
        return imgFiles;
    }
    else {
        // Resize original image
        try {
            resizedFile = nameOnly + '_125.' + fileExt;
            outputFile = path_1.default.resolve(path_1.default.join(outFolder, nameOnly, resizedFile));
            const htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            (0, sharp_1.default)(location).resize({ width: 125, height: 125 }).toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_300.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            const htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            (0, sharp_1.default)(location).resize({ width: 300 }).toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_500.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            const htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            (0, sharp_1.default)(location).resize({ width: 500 }).toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_800.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            const htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            const format = fileExt;
            (0, sharp_1.default)(location)
                .resize({ width: 800, height: 600 })
                .toFormat(format, {
                quality: 60,
            })
                .toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_1080.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            const htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            const format = fileExt;
            (0, sharp_1.default)(location)
                .resize({ width: 1080, height: 1080 })
                .toFormat(format, {
                quality: 60,
            })
                .toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_1280.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            const htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            imgSizes.push(htmlImages);
            const format = fileExt;
            (0, sharp_1.default)(location)
                .toFormat(format, {
                quality: 60,
            })
                .resize({ width: 1280, height: 720 })
                .toFile(outputFile);
        }
        catch (error) {
            console.error('Error occurred trying to resize image with sharp:', error);
        }
        try {
            resizedFile = nameOnly + '_1920.' + fileExt;
            outputFile = path_1.default.join(outFolder, nameOnly, resizedFile);
            const htmlImages = path_1.default.join('output-images', nameOnly, resizedFile);
            const format = fileExt;
            imgSizes.push(htmlImages);
            (0, sharp_1.default)(location)
                .toFormat(format, {
                quality: 60,
            })
                .resize({ width: 1920, height: 1080 })
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
