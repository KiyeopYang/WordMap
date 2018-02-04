import webpush from 'web-push';

const GCM_API_KEY = 'AAAATCNfU6I:APA91bGb75nkccXKjHkIHQdhWnuLqlVsnBVxk40n3WY8xqce-sgCgLubbwRDtGAurUjnX1bdzGkeOF8EpLJ63UUtBql5TIH4jL0xoSA4vFrNMZQ99DubIQG7Ph_wMTGxN0g6oClnDP7f';

webpush.setGCMAPIKey(GCM_API_KEY);

function handlePracticePush({ subscription, push }) {
  return new Promise((resolve, reject) => {
    const { endpoint, keys } = subscription;
    const { key, authSecret } = keys;
    webpush.sendNotification({
      endpoint,
      TTL: 0,
      keys: {
        p256dh: key,
        auth: authSecret,
      },
    }, JSON.stringify({
      ...push,
      // 차후 redirect에 다른 속성 들어갈 수.
      redirect: push.redirectUrl,
    }))
      .then(resolve)
      .catch(reject);
  });
}

export default handlePracticePush;
