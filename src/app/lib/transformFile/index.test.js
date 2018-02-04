import test from 'ava';
import fs from 'fs';
import async from 'async';
import transform from './';

const TEST_CASES = [
  {
    FILENAME: 'file1',
    INPUT: 'let a = ---A---;',
    PARAMS: {
      A: '1',
    },
    OUTPUT: 'let a = 1;',
  },
  {
    FILENAME: 'file2.json',
    INPUT: '{"gcm_sender_id": ---B---}',
    PARAMS: {
      B: '"123123"',
    },
    OUTPUT: '{"gcm_sender_id": "123123"}',
  },
  {
    FILENAME: 'file3.js',
    INPUT: 'let a = ---C---; let d = ---D---;',
    PARAMS: {
      C: '"123123"',
      D: 123123,
    },
    OUTPUT: 'let a = "123123"; let d = 123123;',
  },
];

test.before.cb((t) => {
  async.forEachOf(TEST_CASES, (testCase, key, cb) => {
    fs.writeFile(testCase.FILENAME, testCase.INPUT, 'utf8', (error) => {
      if (error) {
        cb(error);
      } else {
        cb();
      }
    });
  }, (error) => {
    if (error) {
      console.error(error);
      t.fail();
    }
    t.end();
  });
});
TEST_CASES.forEach((testCase) => {
  test.cb((t) => {
    transform(testCase.FILENAME, testCase.PARAMS)
      .then((result) => {
        t.is(result, testCase.OUTPUT);
        t.end();
      })
      .catch((error) => {
        console.error(error);
        t.fail();
        t.end();
      });
  });
});
test.after.always.cb((t) => {
  async.forEachOf(TEST_CASES, (testCase, key, cb) => {
    fs.unlink(testCase.FILENAME, (error) => {
      if (error) {
        cb(error);
      } else {
        cb();
      }
    });
  }, (error) => {
    if (error) {
      console.error(error);
      t.fail();
    }
    t.end();
  });
});
