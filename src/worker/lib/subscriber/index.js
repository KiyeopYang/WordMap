import * as webpush from '../webpush';
import {
  Subscriber,
} from '../../../models';

const ERROR_COUNT_FOR_DELETE = 3;

function updateFailure(sent) {
  return new Promise((resolve, reject) => {
    const filtered = sent.filter(v => !v.isSuccess);
    const bulkUpdate = [];
    filtered.forEach((f) => {
      bulkUpdate.push({
        updateOne: {
          filter: { _id: f._id },
          update: {
            $inc: { failure: 1 },
          },
        },
      });
    });
    if (bulkUpdate.length < 1) {
      resolve([]);
    }
    Subscriber.bulkWrite(bulkUpdate)
      .then(resolve)
      .catch(reject);
  });
}
function sendToAll(data) {
  return new Promise((resolve, reject) => {
    Subscriber.find({
      failure: { $lt: ERROR_COUNT_FOR_DELETE },
    })
      .lean()
      .exec((error, result) => {
        if (error) {
          reject(error);
        } else {
          webpush.sendToManySameData(result, data)
            .then(resolve)
            .catch(reject);
        }
      });
  });
}
export {
  updateFailure,
  sendToAll,
};
