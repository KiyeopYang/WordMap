import express from 'express';
import mongoose from 'mongoose';
import validator from 'validator';
import logging from '../../../lib/logging';
import {
  fromMongo,
  toMongo,
} from '../../../lib/dbConnector';
import {
  Website,
} from '../../../models';
import {
  upload,
  remove,
} from '../../lib/serviceFileManager';
import {
  REDIRECT_URL,
  FETCH_DATA_URL,
  LOG_URL,
  GCM_SENDER_ID,
  SOURCE_URL,
  SERVICE_WORKER_NAME,
  MANIFEST_NAME,
} from '../../config';

const router = express.Router();
const NAME = '결과';
const MOCK_DATE = new Date();
const MOCK_DATE2 = new Date();
MOCK_DATE2.setDate(MOCK_DATE.getDate() - 1);
const MOCK_DATE3 = new Date();
MOCK_DATE3.setDate(MOCK_DATE.getDate() - 2);
const MOCKS = [
  {
    _id: String(mongoose.Types.ObjectId()),
    title: 'titleA titleA titleA titleA titleA titleA titleA ',
    body: 'bodyA',
    icon: '/example_icon.png',
    domainUrl: 'http://webpush.kr',
    redirectUrl: 'https://webpush.kr',
    datetime: MOCK_DATE,
    coverage: {
      desktop: 10000,
      mobile: 20000,
    },
  },
  {
    _id: String(mongoose.Types.ObjectId()),
    title: 'titleB',
    body: 'bodyB',
    icon: '/example_icon.png',
    domainUrl: 'https://webpush.kr',
    redirectUrl: 'https://webpush.kr',
    datetime: MOCK_DATE2,
    coverage: {
      desktop: 20000,
      mobile: 30000,
    },
  },
  {
    _id: String(mongoose.Types.ObjectId()),
    title: 'titleC',
    body: 'bodyC',
    icon: '/example_icon.png',
    domainUrl: 'https://webpush.kr',
    redirectUrl: 'https://webpush.kr',
    datetime: MOCK_DATE3,
    coverage: {
      desktop: 50000,
      mobile: 10000,
    },
  },
  {
    _id: String(mongoose.Types.ObjectId()),
    title: 'titleC',
    body: 'bodyC',
    icon: '/example_icon.png',
    domainUrl: 'https://webpush.kr',
    redirectUrl: 'https://webpush.kr',
    datetime: MOCK_DATE3,
    coverage: {
      desktop: 50000,
      mobile: 10000,
    },
  },
  {
    _id: String(mongoose.Types.ObjectId()),
    title: 'titleC',
    body: 'bodyC',
    icon: '/example_icon.png',
    domainUrl: 'https://webpush.kr',
    redirectUrl: 'https://webpush.kr',
    datetime: MOCK_DATE3,
    coverage: {
      desktop: 50000,
      mobile: 10000,
    },
  },
  {
    _id: String(mongoose.Types.ObjectId()),
    title: 'titleC',
    body: 'bodyC',
    icon: '/example_icon.png',
    domainUrl: 'https://webpush.kr',
    redirectUrl: 'https://webpush.kr',
    datetime: MOCK_DATE3,
    coverage: {
      desktop: 50000,
      mobile: 10000,
    },
  },
];

// 읽기
router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (validator.isMongoId(id)) {
    const found = MOCKS.find(o => o._id === id);
    if (found) {
      res.json(found);
    } else {
      res.status(500).json({
        message: `${NAME} 조회 - 조회에 에러가 있습니다.`,
      });
    }
    // Website.findOne({
    //   _id: id,
    // })
    //   .lean()
    //   .exec((error, r) => {
    //     if (error) {
    //       logging.error(error);
    //       res.status(500).json({ message: '웹 사이트 조회 - 조회에 에러가 있습니다.' });
    //     }
    //     const result = fromMongo(r);
    //     res.json(result);
    //   });
  } else {
    res.status(500).json({
      message: `${NAME} 조회 - 조회에 에러가 있습니다.`,
    });
  }
});
// 리스트 불러오기
router.get('/', (req, res) => {
  res.json(MOCKS);
});
// 한 건 삭제
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (validator.isMongoId(id)) {
    const found = MOCKS.findIndex(o => o._id === id);
    if (found > -1) {
      MOCKS.splice(found, 1);
      res.json({ success: true });
    } else {
      res.status(500).json({
        message: `${NAME} 삭제 - 삭제에 에러가 있습니다.`,
      });
    }
    // Website.findOne({
    //   _id: id,
    // })
    //   .lean()
    //   .exec((error, r) => {
    //     if (error) {
    //       logging.error(error);
    //       res.status(500).json({ message: '웹 사이트 삭제 - 삭제에 에러가 있습니다.' });
    //     }
    //     const result = fromMongo(r);
    //     res.json(result);
    //   });
  } else {
    res.status(500).json({
      message: `${NAME} 삭제 - 삭제에 에러가 있습니다.`,
    });
  }
});
export default router;
