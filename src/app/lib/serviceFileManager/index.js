import async from 'async';
import path from 'path';
import * as GCS from '../GCSFileManager';
import transformFile from '../transformFile';

const FILE_TYPES = [
  'configuration',
  'manifest',
  'serviceWorker',
  'serviceWorkerBridge',
];
const FILE_DIR = {
  configuration: path.join(__dirname, 'baseFiles', 'configuration.txt'),
  serviceWorker: path.join(__dirname, 'baseFiles', 'serviceWorker.txt'),
  serviceWorkerBridge: path.join(__dirname, 'baseFiles', 'serviceWorkerBridge.txt'),
};
// 만들기
function make(fileType, map, file) {
  return new Promise((resolve, reject) => {
    if (!FILE_TYPES.includes(fileType)) {
      reject();
    } else if (fileType === 'manifest') {
      resolve(JSON.stringify(map));
    } else {
      transformFile(file, map)
        .then(resolve)
        .catch(reject);
    }
  });
}
// 올리기
function upload(files) {
  /*
  input example : {
    configuration: {
      filename: 'configuration',
      dir: dirA,
      data: { client: '12345' },
    },
    manifest: {
      filename: 'manifest',
      dir: dirA,
      data: { gcm_sender_id: '0104645' },
    },
    serviceWorker: {
      filename: 'serviceWorker',
      dir: dirA,
      data: { client: '12345' },
    },
    serviceWorkerBridge: {
      filename: 'serviceWorkerBridge',
      dir: dirA,
      data: { serviceWorker: 'abcde' },
    },
   */
  return new Promise((resolve, reject) => {
    if (!files) {
      reject();
    } else {
      const result = {};
      async.forEachOf(files, (file, key, cb) => {
        make(
          key,
          file.data,
          key === 'manifest' ? null : FILE_DIR[key],
        )
          .then((script) => {
            GCS.upload({
              filename: file.filename,
              dir: file.dir,
              content: script,
            }, {
              metadata: {
                contentType: key === 'manifest' ?
                  'application/json' : 'application/javascript',
              },
            })
              .then((url) => {
                result[key] = {
                  filename: file.filename,
                  dir: file.dir,
                  url,
                };
                cb();
              })
              .catch((error) => {
                cb(error);
              });
          })
          .catch((error) => {
            cb(error);
          });
      }, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    }
  });
}
// 삭제하기
function remove(files) {
  return new Promise((resolve, reject) => {
    if (!files) {
      reject();
    } else {
      async.forEachOf(files, (file, key, cb) => {
        GCS.remove(file)
          .then(() => {
            cb();
          })
          .catch((error) => {
            cb(error);
          });
      }, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    }
  });
}
export {
  make,
  upload,
  remove,
};
