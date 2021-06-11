import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../index';
import imgResize from '../utilities/sharp-resize';

const request = supertest(app);

describe('Test endpoint response', async () => {
  beforeAll(() => {
    // empty dist/output-images folder before test
    fs.rmdirSync('dist/output-images', { recursive: true });

    // Create The-Subway-Cave-Utah folder for the test
    try {
      fs.mkdirSync(
        path.resolve('dist', 'output-images', 'The-Subway-Cave-Utah'),
        { recursive: true }
      );
    } catch (err) {
      console.error(
        'Error occurred during file and folder setup for test',
        err
      );
    }

    const pathToTestImage = path.resolve(
      'dist',
      'test-image',
      'The-Subway-Cave-Utah.jpg'
    );
    const pathImgOutput = path.resolve(
      'dist',
      'output-images',
      'The-Subway-Cave-Utah',
      'The-Subway-Cave-Utah.jpg'
    );

    try {
      fs.copyFileSync(pathToTestImage, pathImgOutput);
    } catch (err) {
      console.error('Error during test trying to copy file:', err);
    }

    try {
      if (
        fs.existsSync(
          path.join(
            'dist',
            'output-images',
            'The-Subway-Cave-Utah',
            'The-Subway-Cave-Utah.jpg'
          )
        )
      ) {
        imgResize(pathImgOutput);
      }
    } catch (err) {
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
    expect(
      fs.existsSync(
        path.join(
          'dist',
          'output-images',
          'The-Subway-Cave-Utah',
          'The-Subway-Cave-Utah_100.jpg'
        )
      )
    ).toBeTruthy();
  });

  it('/processed-image generated The-Subway-Cave-Utah_300.jpg', () => {
    expect(
      fs.existsSync(
        path.join(
          'dist',
          'output-images',
          'The-Subway-Cave-Utah',
          'The-Subway-Cave-Utah_300.jpg'
        )
      )
    ).toBeTruthy();
  });

  it('/processed-image generated The-Subway-Cave-Utah_500.jpg', () => {
    // expect(imagesArr.length).toEqual(7);
    expect(
      fs.existsSync(
        path.join(
          'dist',
          'output-images',
          'The-Subway-Cave-Utah',
          'The-Subway-Cave-Utah_500.jpg'
        )
      )
    ).toBeTruthy();
  });

  it('/processed-image generated The-Subway-Cave-Utah_750.jpg', () => {
    expect(
      fs.existsSync(
        path.join(
          'dist',
          'output-images',
          'The-Subway-Cave-Utah',
          'The-Subway-Cave-Utah_750.jpg'
        )
      )
    ).toBeTruthy();
  });

  it('/processed-image generated The-Subway-Cave-Utah_1000.jpg', () => {
    // expect(imagesArr.length).toEqual(7);
    expect(
      fs.existsSync(
        path.join(
          'dist',
          'output-images',
          'The-Subway-Cave-Utah',
          'The-Subway-Cave-Utah_1000.jpg'
        )
      )
    ).toBeTruthy();
  });

  it('/processed-image generated The-Subway-Cave-Utah_1500.jpg', () => {
    expect(
      fs.existsSync(
        path.join(
          'dist',
          'output-images',
          'The-Subway-Cave-Utah',
          'The-Subway-Cave-Utah_1500.jpg'
        )
      )
    ).toBeTruthy();
  });

  it('/processed-image generated The-Subway-Cave-Utah_2500.jpg', () => {
    // expect(imagesArr.length).toEqual(7);
    expect(
      fs.existsSync(
        path.join(
          'dist',
          'output-images',
          'The-Subway-Cave-Utah',
          'The-Subway-Cave-Utah_2500.jpg'
        )
      )
    ).toBeTruthy();
  });
});
