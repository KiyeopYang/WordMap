import webpush from 'web-push';
import async from 'async';

const GCM_API_KEY = 'AAAATCNfU6I:APA91bGb75nkccXKjHkIHQdhWnuLqlVsnBVxk40n3WY8xqce-sgCgLubbwRDtGAurUjnX1bdzGkeOF8EpLJ63UUtBql5TIH4jL0xoSA4vFrNMZQ99DubIQG7Ph_wMTGxN0g6oClnDP7f';

webpush.setGCMAPIKey(GCM_API_KEY);

function sendToManySameData(subs, data) {
  return new Promise((resolve, reject) => {
    const result = {
      success: 0,
      failure: 0,
      attempts: [],
    };
    async.each(subs, (sub, cb) => {
      webpush.sendNotification({
        endpoint: sub.endpoint,
        TTL: 0,
        keys: sub.keys,
      }, data)
        .then(() => {
          result.success += 1;
          result.attempts.push({ ...sub, isSuccess: true });
          cb();
        })
        .catch((error) => {
          result.failure += 1;
          result.attempts.push({ ...sub, isSuccess: false, error });
          cb();
        });
    }, () => {
      console.log(result);
      if (result.success > 0) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
}

export {
  sendToManySameData,
};
