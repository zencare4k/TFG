import multer from 'multer';
import upload, { uploadToCloudinary } from '../../src/Middleware/upload.js';

describe('upload middleware', () => {
  it('debe ser una función de multer', () => {
    expect(typeof upload.single).toBe('function');
  });
});

describe('uploadToCloudinary', () => {
  it('lanza error si el archivo no existe', async () => {
    await expect(uploadToCloudinary('ruta/falsa.jpg')).rejects.toThrow();
  });
});