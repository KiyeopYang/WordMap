import request from 'request';
import Storage from '@google-cloud/storage';
import Multer from 'multer';
import config from '../config';
import logging from './logging';

const CLOUD_BUCKET = config.get('CLOUD_BUCKET');

const storage = Storage({
  projectId: config.get('GCLOUD_PROJECT'),
});
const bucket = storage.bucket(CLOUD_BUCKET);

// Returns the public, anonymously accessable URL to a given Cloud Storage
// object.
// The object's ACL has to be set to public read.
function getPublicUrl(filename) {
  return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`;
}

// Downloads a given image (by URL) and then uploads it to
// Google Cloud Storage. Provides the publicly accessable URL to the callback.
// [START download_and_upload]
function downloadAndUploadImage(sourceUrl, destFileName, cb) {
  const file = bucket.file(destFileName);

  request
    .get(sourceUrl)
    .on('error', (err) => {
      logging.warn(`Could not fetch image ${sourceUrl}`, err);
      cb(err);
    })
    .pipe(file.createWriteStream())
    .on('finish', () => {
      logging.info(`Uploaded image ${destFileName}`);
      file.makePublic(() => {
        cb(null, getPublicUrl(destFileName));
      });
    })
    .on('error', (err) => {
      logging.error('Could not upload image', err);
      cb(err);
    });
}
// [END download_and_upload]

// Express middleware that will automatically pass uploads to Cloud Storage.
// req.file is processed and will have two new properties:
// * ``cloudStorageObject`` the object name in cloud storage.
// * ``cloudStoragePublicUrl`` the public url to the object.
function sendUploadToGCS(req, res, next) {
  if (!req.file) {
    return next();
  }

  const gcsname = Date.now() + req.file.originalname;
  const file = bucket.file(gcsname);
  const stream = file.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
    },
  });

  stream.on('error', (err) => {
    req.file.cloudStorageError = err;
    next(err);
  });

  stream.on('finish', () => {
    req.file.cloudStorageObject = gcsname;
    file.makePublic().then(() => {
      req.file.cloudStoragePublicUrl = getPublicUrl(gcsname);
      next();
    });
  });

  stream.end(req.file.buffer);
  return next();
}

// Multer handles parsing multipart/form-data requests.
// This instance is configured to store images in memory.
// This makes it straightforward to upload to Cloud Storage.
const multer = Multer({
  storage: Multer.MemoryStorage,
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb
  },
});

export default {
  downloadAndUploadImage,
  getPublicUrl,
  sendUploadToGCS,
  multer,
};
