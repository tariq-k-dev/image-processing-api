"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("../index"));
const sharp_resize_1 = __importDefault(require("../utilities/sharp-resize"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint response', () => {
    beforeAll(() => {
        // empty dist/output-images folder before test
        fs_1.default.rmSync('dist/output-images', { recursive: true, force: true });
        // Create The-Subway-Cave-Utah folder for the test
        try {
            fs_1.default.mkdirSync(path_1.default.resolve('dist', 'output-images', 'The-Subway-Cave-Utah'), { recursive: true });
        }
        catch (err) {
            console.error('Error occurred during file and folder setup for test', err);
        }
        const pathToTestImage = path_1.default.resolve('dist', 'test-image', 'The-Subway-Cave-Utah.jpg');
        const pathImgOutput = path_1.default.resolve('dist', 'output-images', 'The-Subway-Cave-Utah', 'The-Subway-Cave-Utah.jpg');
        try {
            fs_1.default.copyFileSync(pathToTestImage, pathImgOutput);
        }
        catch (err) {
            console.error('Error during test trying to copy file:', err);
        }
        try {
            if (fs_1.default.existsSync(path_1.default.join('dist', 'output-images', 'The-Subway-Cave-Utah', 'The-Subway-Cave-Utah.jpg'))) {
                (0, sharp_resize_1.default)(pathImgOutput);
            }
        }
        catch (err) {
            console.error('Error occurred during Sharp image resize step...');
        }
    });
    it('get / with status of 200', async () => {
        await request.get('/').expect(200);
    });
    // image processing route
    it('get /processed-images with status of 200', () => {
        request.post('/processed-images').expect(200);
    });
    it('/processed-image generated The-Subway-Cave-Utah_100.jpg', () => {
        // expect(imagesArr.length).toEqual(7);
        expect(fs_1.default.existsSync(path_1.default.join('dist', 'output-images', 'The-Subway-Cave-Utah', 'The-Subway-Cave-Utah_125.jpg'))).toBeTruthy();
    });
    it('/processed-image generated The-Subway-Cave-Utah_300.jpg', () => {
        expect(fs_1.default.existsSync(path_1.default.join('dist', 'output-images', 'The-Subway-Cave-Utah', 'The-Subway-Cave-Utah_300.jpg'))).toBeTruthy();
    });
    it('/processed-image generated The-Subway-Cave-Utah_500.jpg', () => {
        // expect(imagesArr.length).toEqual(7);
        expect(fs_1.default.existsSync(path_1.default.join('dist', 'output-images', 'The-Subway-Cave-Utah', 'The-Subway-Cave-Utah_500.jpg'))).toBeTruthy();
    });
    it('/processed-image generated The-Subway-Cave-Utah_800.jpg', () => {
        expect(fs_1.default.existsSync(path_1.default.join('dist', 'output-images', 'The-Subway-Cave-Utah', 'The-Subway-Cave-Utah_800.jpg'))).toBeTruthy();
    });
    it('/processed-image generated The-Subway-Cave-Utah_1080.jpg', () => {
        // expect(imagesArr.length).toEqual(7);
        expect(fs_1.default.existsSync(path_1.default.join('dist', 'output-images', 'The-Subway-Cave-Utah', 'The-Subway-Cave-Utah_1080.jpg'))).toBeTruthy();
    });
    it('/processed-image generated The-Subway-Cave-Utah_1280.jpg', () => {
        expect(fs_1.default.existsSync(path_1.default.join('dist', 'output-images', 'The-Subway-Cave-Utah', 'The-Subway-Cave-Utah_1280.jpg'))).toBeTruthy();
    });
    it('/processed-image generated The-Subway-Cave-Utah_1920.jpg', () => {
        // expect(imagesArr.length).toEqual(7);
        expect(fs_1.default.existsSync(path_1.default.join('dist', 'output-images', 'The-Subway-Cave-Utah', 'The-Subway-Cave-Utah_1920.jpg'))).toBeTruthy();
    });
});
