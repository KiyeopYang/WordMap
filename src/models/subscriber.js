import mongoose from 'mongoose';

const { Schema } = mongoose;
const Subscriber = new Schema({
  website: {
    type: Schema.Types.ObjectId,
    ref: 'website',
    required: true,
  },
  endpoint: String,
  keys: {
    p256dh: String,
    auth: String,
  },
  datetime: {
    type: Date,
    default: new Date(),
  },
  failure: {
    type: Number,
    default: 0,
  },
});

Subscriber.index({ website: 1 });
const model = mongoose.model('subscriber', Subscriber);

export default model;
