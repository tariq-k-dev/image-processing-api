import supertest from 'supertest';
import fs from 'fs';
import path from 'path';
import app from '../index';
import imgResize from '../utilities/sharp-resize';

const request = supertest(app);

describe('Test endpoint response', async () => {
  let imagesArr: string[] = [];

  beforeEach(() => {
    if (
      !fs.existsSync(
        path.resolve('dist', 'output-images', 'The-Subway-Cave-Utah')
      )
    ) {
      fs.mkdir(
        path.resolve('dist', 'output-images', 'The-Subway-Cave-Utah'),
        (err) => {
          if (err) {
            console.error(err);
          }
        }
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
      fs.copyFile(pathToTestImage, pathImgOutput, (err) => {
        if (err)
          console.error(
            'Error occurre trying to copy file during the test:',
            err
          );
      });

      imagesArr = imgResize(pathImgOutput);
    } catch (err) {
      console.error('Error during test trying to copy file:', err);
    }
  });

  it('get / with status of 200', async () => {
    await request.get('/').expect(200);
  });

  // image processing route
  it('get /processed-images with status of 200', async () => {
    await request.post('/processed-images').expect(200);
  });

  it('/processed-image generates 7 images', () => {
    expect(imagesArr.length).toEqual(7);
  });
});
