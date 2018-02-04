import mongoose from 'mongoose';

const { Schema } = mongoose;
const Website = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: 'customer',
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
  webpushDomain: {
    type: String,
    required: true,
  },
  https: {
    type: Boolean,
    required: true,
    default: false,
  },
  // 단순 importScript용 (고객의 DOMAIN을 사용하여 접근할 수 있는 위치)
  serviceWorkerName: {
    type: String,
    required: true,
    default: '/service-worker.js',
  },
  manifestName: {
    type: String,
    required: true,
    default: '/manifest.json',
  },
  debug: {
    type: Boolean,
    required: true,
    default: false,
  },
  status: {
    type: Number,
    required: true,
    default: 0,
  },
  promptDelay: {
    type: Number,
    required: true,
    default: 1,
  },
  // 이하 configuration 파일에 저장 X
  files: {
    configuration: {
      url: String,
      filename: String,
      dir: String,
    },
    // 실 작동 서비스 워커
    serviceWorker: {
      url: String,
      filename: String,
      dir: String,
    },
    // 실 작동 서비스 워커를 불러올 브릿지
    serviceWorkerBridge: {
      url: String,
      filename: String,
      dir: String,
    },
    // 실 작동 서비스 워커를 불러올 브릿지
    manifest: {
      url: String,
      filename: String,
      dir: String,
    },
  },
  domainName: {
    type: String,
    required: true,
  },
  integrationStatus: {
    type: Number,
    required: true,
    default: 0,
  },
  gcm_sender_id: {
    type: String,
  },
});
Website.index({ domain: 1, https: 1, stautus: 1 }, { unique: true });

const model = mongoose.model('website', Website);

export default model;
