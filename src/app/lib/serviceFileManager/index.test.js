import test from 'ava';
import request from 'request';
import async from 'async';
import {
  make,
  upload,
  remove,
} from './';

// 업로드, JSON make만 테스트

const dirA = `${Date.now()}dirA`;
const INPUT_A = {
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
};
let INPUT_A_URLS;
const dirB = `${Date.now()}dirB`;
const INPUT_B = {
  configuration: {
    filename: 'configuration',
    dir: dirB,
    data: {},
  },
  manifest: {
    filename: 'mainfest',
    dir: dirB,
    data: {},
  },
};
let INPUT_B_URLS;

test.cb('make JSON TEST', (t) => {
  const JSON_TEST = { gcm_sender_id: '914857280374' };
  make('manifest', JSON_TEST)
    .then((result) => {
      t.is(result, JSON.stringify(JSON_TEST));
      t.end();
    })
    .catch((error) => {
      console.error(error);
      t.fail();
      t.end();
    });
});
test.cb.serial('upload A', (t) => {
  upload(INPUT_A)
    .then((results) => {
      INPUT_A_URLS = results;
      if (!results || Object.keys(results).length !== 4) {
        t.fail();
        t.end();
      } else {
        async.forEachOf(results, (result, v, cb) => {
          if (!result.url) {
            t.fail();
            t.end();
          } else {
            request({
              url: result.url,
              headers: {
                pragma: 'no-cache',
                'cache-control': 'no-cache',
              },
            }, (error, response) => {
              if (error && response.statusCode !== 200) {
                console.error(error);
                t.fail();
              } else {
                t.pass();
              }
              cb();
            });
          }
        }, (error) => {
          if (error) {
            console.error(error);
            t.fail();
          } else {
            t.pass();
          }
          t.end();
        });
      }
    })
    .catch((error) => {
      console.error(error);
      t.fail();
      t.end();
    });
});
test.cb.serial('upload B', (t) => {
  upload(INPUT_B)
    .then((results) => {
      INPUT_B_URLS = results;
      if (!results || Object.keys(results).length !== 2) {
        t.fail();
        t.end();
      } else {
        async.forEachOf(results, (result, v, cb) => {
          if (!result.url) {
            t.fail();
            t.end();
          } else {
            request({
              url: result.url,
              headers: {
                pragma: 'no-cache',
                'cache-control': 'no-cache',
              },
            }, (error, response) => {
              if (error && response.statusCode !== 200) {
                console.error(error);
                t.fail();
              } else {
                t.pass();
              }
              cb();
            });
          }
        }, (error) => {
          if (error) {
            console.error(error);
            t.fail();
          } else {
            t.pass();
          }
          t.end();
        });
      }
    })
    .catch((error) => {
      console.error(error);
      t.fail();
      t.end();
    });
});
test.cb.serial('remove', (t) => {
  async.forEachOf([
    INPUT_A_URLS,
    INPUT_B_URLS,
  ], (input, k, cb) => {
    remove(input)
      .then(() => cb())
      .catch(error => cb(error));
  }, (error) => {
    if (error) {
      console.error(error);
      t.fail();
    } else {
      t.pass();
    }
    t.end();
  });
});
