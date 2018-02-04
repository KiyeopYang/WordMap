import test from 'ava';
import supertest from 'supertest';
import request from 'request';
import mongoose from 'mongoose';
import async from 'async';
import {
  Website,
} from '../../../models';

/*
 삭제 API 수행 시 완전히 삭제는 되지 않고 status만 -1로 바뀌어 삭제된 흉내를 낸다.
 실제 제거 된 경우와 위와 같이 얕게 삭제 된 경우 모두를 테스트한다.
 */
const DOMAIN = 'test01046457084.test';
const CLIENT = String(mongoose.Types.ObjectId());
const INPUT_A = {
  CLIENT,
  DOMAIN,
  ID: null,
  CONFIGURATION_URL: null,
  SERVICEWORKER_URL: null,
  SERVICEWORKER_BRIDGE_URL: null,
  MANIFEST_URL: null,
};
const INPUT_B = {
  CLIENT,
  DOMAIN,
  ID: null,
  CONFIGURATION_URL: null,
  SERVICEWORKER_URL: null,
  SERVICEWORKER_BRIDGE_URL: null,
  MANIFEST_URL: null,
};

export default function (app, url) {
  test.serial('create and make script (http)', async (t) => {
    const res = await supertest(app)
      .post(url)
      .send({
        client: INPUT_A.CLIENT,
        domain: DOMAIN,
        https: false,
      });
    t.is(res.status, 200);
    if (!res.body.id || res.body._id) {
      t.fail();
    }
    t.is(res.body.client, INPUT_A.CLIENT);
    t.is(res.body.domain, DOMAIN);
    t.is(res.body.webpushDomain, `https://${DOMAIN.slice(0, DOMAIN.indexOf('.'))}.webpush.kr`);
    t.is(res.body.https, false);
    t.is(res.body.debug, false);
    t.is(res.body.status, 0);
    t.is(res.body.promptDelay, 1);
    INPUT_A.ID = res.body.id;
    INPUT_A.CONFIGURATION_URL = res.body.files.configuration.url;
    INPUT_A.SERVICEWORKER_URL = res.body.files.serviceWorker.url;
    INPUT_A.SERVICEWORKER_BRIDGE_URL = res.body.files.serviceWorkerBridge.url;
    INPUT_A.MANIFEST_URL = res.body.files.manifest.url;
  });
  test.serial('cannot make duplicate { domain, https }', async (t) => {
    const res = await supertest(app)
      .post(url)
      .send({
        client: INPUT_A.CLIENT,
        domain: DOMAIN,
        https: false,
      });
    t.is(res.status, 500);
  });
  test.serial('create and make script (https)', async (t) => {
    const res = await supertest(app)
      .post(url)
      .send({
        client: INPUT_B.CLIENT,
        domain: DOMAIN,
        https: true,
      });
    t.is(res.status, 200);
    if (!res.body.id || res.body._id) {
      t.fail();
    }
    t.is(res.body.client, INPUT_B.CLIENT);
    t.is(res.body.domain, DOMAIN);
    t.is(res.body.webpushDomain, `https://${DOMAIN}`);
    t.is(res.body.https, true);
    t.is(res.body.debug, false);
    t.is(res.body.status, 0);
    t.is(res.body.promptDelay, 1);
    INPUT_B.ID = res.body.id;
    INPUT_B.CONFIGURATION_URL = res.body.files.configuration.url;
    INPUT_B.SERVICEWORKER_URL = res.body.files.serviceWorker.url;
    INPUT_B.SERVICEWORKER_BRIDGE_URL = res.body.files.serviceWorkerBridge.url;
    INPUT_B.MANIFEST_URL = res.body.files.manifest.url;
  });
  test.serial.cb('check uploaded script to GCS', (t) => {
    async.forEachOf([
      INPUT_A.CONFIGURATION_URL,
      INPUT_B.CONFIGURATION_URL,
      INPUT_A.SERVICEWORKER_URL,
      INPUT_B.SERVICEWORKER_URL,
      INPUT_A.SERVICEWORKER_BRIDGE_URL,
      INPUT_B.SERVICEWORKER_BRIDGE_URL,
      INPUT_A.MANIFEST_URL,
      INPUT_B.MANIFEST_URL,
    ], (url, key, cb) => {
      request({
        url,
        headers: {
          pragma: 'no-cache',
          'cache-control': 'no-cache',
        },
      }, (error, response) => {
        if (!response || error || response.statusCode !== 200) {
          console.error(error);
          t.fail();
        }
        cb();
      });
    }, (error) => {
      if (error) {
        console.error(error);
        t.fail();
      }
      t.pass();
      t.end();
    });
  });
  test.serial('update One (only configuration)', async (t) => {
    const res = await supertest(app)
      .put(`${url}/configuration/${INPUT_A.ID}`)
      .send({
        promptDelay: 5,
        status: -1,
      });
    t.is(res.status, 200);
    if (!res.body.id || res.body._id) {
      t.fail();
    }
    t.is(res.body.client, INPUT_A.CLIENT);
    t.is(res.body.domain, DOMAIN);
    t.is(res.body.webpushDomain, `https://${DOMAIN.slice(0, DOMAIN.indexOf('.'))}.webpush.kr`);
    t.is(res.body.https, false);
    t.is(res.body.debug, false);
    t.is(res.body.id, INPUT_A.ID);
    t.is(res.body.promptDelay, 5);
    t.is(res.body.status, -1);
  });
  test.serial('update duplicated but deleted item', async (t) => {
    const res = await supertest(app)
      .post(url)
      .send({
        client: INPUT_A.CLIENT,
        domain: DOMAIN,
        https: false,
      });
    t.is(res.status, 200);
    if (!res.body.id || res.body._id) {
      t.fail();
    }
    t.is(res.body.id, INPUT_A.ID);
    t.is(res.body.promptDelay, 1);
    t.is(res.body.status, 0);
  });
  test.serial('list', async (t) => {
    const res = await supertest(app)
      .get(`${url}`);
    t.is(res.status, 200);
    t.true(Array.isArray(res.body));
    t.true(res.body.length > 0);
  });
  test.serial('list', async (t) => {
    const res = await supertest(app)
      .get(`${url}/?client=${INPUT_A.CLIENT}`);
    t.is(res.status, 200);
    t.true(Array.isArray(res.body));
    res.body.forEach((o) => {
      t.is(o.client, INPUT_A.CLIENT);
    });
    t.true(res.body.length > 0);
  });
  test.serial('read One(HTTP)', async (t) => {
    const res = await supertest(app)
      .get(`${url}/${INPUT_A.ID}`);
    t.is(res.status, 200);
    if (!res.body.id || res.body._id) {
      t.fail();
    }
    t.is(res.body.id, INPUT_A.ID);
    t.is(res.body.client, INPUT_A.CLIENT);
    t.is(res.body.domain, DOMAIN);
    t.is(res.body.webpushDomain, `https://${DOMAIN.slice(0, DOMAIN.indexOf('.'))}.webpush.kr`);
    t.is(res.body.https, false);
    t.is(res.body.debug, false);
    t.is(res.body.status, 0);
    t.is(res.body.promptDelay, 1);
  });
  test.serial('read One(HTTPS)', async (t) => {
    const res = await supertest(app)
      .get(`${url}/${INPUT_B.ID}`);
    t.is(res.status, 200);
    if (!res.body.id || res.body._id) {
      t.fail();
    }
    t.is(res.body.id, INPUT_B.ID);
    t.is(res.body.client, INPUT_B.CLIENT);
    t.is(res.body.domain, DOMAIN);
    t.is(res.body.webpushDomain, `https://${DOMAIN}`);
    t.is(res.body.https, true);
    t.is(res.body.debug, false);
    t.is(res.body.status, 0);
    t.is(res.body.promptDelay, 1);
  });
  test.serial('delete One (HTTP)', async (t) => {
    const res = await supertest(app)
      .del(`${url}/${INPUT_A.ID}`);
    t.is(res.status, 200);
  });
  test.serial('delete One (HTTPS)', async (t) => {
    const res = await supertest(app)
      .del(`${url}/${INPUT_B.ID}`);
    t.is(res.status, 200);
  });
  test.after.always.cb('delete all test data', (t) => {
    Website.find({
      client: {
        $in: [
          INPUT_A.CLIENT,
          INPUT_B.CLIENT,
        ],
      },
    })
      .lean()
      .exec((error, r) => {
        if (error) {
          console.error(error);
          t.fail();
        }
        Website.deleteMany({
          client: {
            $in: [
              INPUT_A.CLIENT,
              INPUT_B.CLIENT,
            ],
          },
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
  });
}
