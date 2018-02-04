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

// 초기 생성 (script 파일 연동)
router.post('/', (req, res) => {
  // input validation
  const { client, domain, https } = req.body;
  try {
    const v = [
      validator.isMongoId(client),
      typeof domain === 'string',
      typeof https === 'boolean',
    ].every(b => b);
    if (!v) {
      return res.status(400).json({
        message: '웹 사이트 생성 - 입력 값이 잘못되었습니다.',
      });
    }
  } catch (error) {
    return res.status(400).json({
      message: '웹 사이트 생성 - 입력 값이 잘못되었습니다.',
    });
  }
  // configuration of website
  let webpushDomain;
  const domainName = domain.slice(0, domain.indexOf('.'));
  if (https) {
    webpushDomain = `https://${domain}`;
  } else {
    webpushDomain = `https://${domainName}.webpush.kr`;
  }
  // 저장될 파일들
  const baseConfig = {
    client,
    domain,
    https,
    webpushDomain,
    debug: false,
    status: 0,
    promptDelay: 1,
    serviceWorkerName: SERVICE_WORKER_NAME,
    manifestName: MANIFEST_NAME,
  };
  const configuration = {
    filename: 'config.js',
    dir: null,
    data: {
      configuration: JSON.stringify(baseConfig),
      source: SOURCE_URL,
    },
  };
  const serviceWorker = {
    filename: 'sw.js',
    dir: null,
    data: {
      client,
      redirectUrl: REDIRECT_URL,
      fetchData: FETCH_DATA_URL,
      logReciever: LOG_URL,
      debug: false,
    },
  };
  const serviceWorkerBridge = {
    filename: SERVICE_WORKER_NAME,
    dir: null,
    data: {
      serviceWorker: null,
    },
  };
  const manifest = {
    filename: MANIFEST_NAME,
    dir: null,
    data: {
      gcm_sender_id: GCM_SENDER_ID,
    },
  };
  // 기존에 저장된 사항 있나 확인
  return Website.findOne({
    domain,
    https,
  })
    .lean()
    .exec((error, r) => {
      if (error) {
        return res.status(500).json({
          message: '웹 사이트 생성 - DB 조회에 에러가 있습니다.',
        });
      }
      const result = fromMongo(r);
      // 작동하는 기존 사이트 존재 할 시
      if (result && result.status !== -1) {
        return res.status(500).json({
          message: '웹 사이트 생성 - 중복된 사이트가 존재합니다.',
        });
      }
      return new Promise((resolve, reject) => {
        const websiteDoc = {
          ...baseConfig,
          client: mongoose.Types.ObjectId(baseConfig.client),
          domainName,
          gcm_sender_id: GCM_SENDER_ID,
        };
        // 기존 사이트 존재하나, 삭제 요청 된 상태일 땐 새로 업데이트하고 통과
        // if (result && result.status === -1) {
        //   return Website.updateOne({
        //     _id: mongoose.Types.ObjectId(result.id),
        //   }, {
        //     $set: websiteDoc,
        //   }, (error) => {
        //     if (error) {
        //       return reject(error);
        //     }
        //     return Website.findOne({
        //       _id: result.id,
        //     })
        //       .lean()
        //       .exec((error, r) => {
        //         if (error) {
        //           return reject(error);
        //         }
        //         return resolve(fromMongo(r));
        //       });
        //   });
        // }
        // 기존 사이트 존재하지 않을 때, 새로 생성하고 통과
        return new Website(websiteDoc).save((error, r) => {
          if (error) {
            return reject(error);
          }
          return resolve(fromMongo(r));
        });
      })
        .then((website) => {
          // GCS에 환경설정파일 저장
          const dir = website.id;
          configuration.dir = dir;
          serviceWorker.dir = dir;
          manifest.dir = dir;
          serviceWorkerBridge.dir = dir;
          upload({
            configuration,
            serviceWorker,
            manifest,
          })
            .then((resultA) => {
              try {
                const {
                  configuration,
                  serviceWorker,
                  manifest,
                } = resultA;
                // 서비스 워커 브릿지는 서비스 워커의 주소를 참조해야 한다.
                serviceWorkerBridge.data.serviceWorker = serviceWorker.url;
                upload({
                  serviceWorkerBridge,
                })
                  .then((resultB) => {
                    const {
                      serviceWorkerBridge,
                    } = resultB;
                    Website.updateOne({
                      _id: website.id,
                    }, {
                      $set: {
                        files: {
                          configuration,
                          serviceWorker,
                          serviceWorkerBridge,
                          manifest,
                        },
                      },
                    }, (error) => {
                      if (error) {
                        throw new Error({ message: '웹 사이트 생성 - DB 처리에 에러가 있습니다.' })
                      }
                      Website.findOne({
                        _id: website.id,
                      })
                        .lean()
                        .exec((error, r) => {
                          if (error) {
                            throw new Error({ message: '웹 사이트 생성 - DB 처리에 에러가 있습니다.' })
                          }
                          const result = fromMongo(r);
                          return res.json(result);
                        });
                    });
                  })
                  .catch((error) => {
                    throw error;
                  });
              } catch (error) {
                throw error;
              }
            })
            .catch((error) => {
              throw error;
            });
        })
        .catch((error) => {
          logging.error(error);
          if (error) {
            res.status(500).json(error);
          } else {
            res.status(500).json({ message: '웹 사이트 생성 - 처리에 에러가 있습니다.' });
          }
        });
    });
});
// 읽기
router.get('/:id', (req, res) => {
  const { id } = req.params;
  if (validator.isMongoId(id)) {
    Website.findOne({
      _id: id,
    })
      .lean()
      .exec((error, r) => {
        if (error) {
          logging.error(error);
          res.status(500).json({ message: '웹 사이트 조회 - 조회에 에러가 있습니다.' });
        }
        const result = fromMongo(r);
        res.json(result);
      });
  } else {
    res.json(null);
  }
});
// 리스트 불러오기
router.get('/', (req, res) => {
  const { client } = req.query;
  Website.find(client ? { client } : {})
    .lean()
    .exec((error, r) => {
      if (error) {
        logging.error(error);
        res.status(500).json({ message: '웹 사이트 조회 - 조회에 에러가 있습니다.' });
      } else {
        const result = fromMongo(r);
        res.json(result);
      }
    });
});
// 수정하기
router.put('/configuration/:id', (req, res) => {
  // http -> https 변경은 불가능하다.
  const { id } = req.params;
  if (id) {
    Website.updateOne({
      _id: id,
    }, {
      $set: toMongo(req.body),
    }, (error, r) => {
      if (error) {
        logging.error(error);
        res.status(400).json({ message: '웹 사이트 수정 - 수정에 오류가 있습니다.' });
      }
      Website.findOne({
        _id: id,
      })
        .lean()
        .exec((error, r) => {
          if (error) {
            logging.error(error);
            res.status(400).json({ message: '웹 사이트 수정 - 수정에 오류가 있습니다.' });
          }
          const result = fromMongo(r);
          const baseConfig = {
            client: result.client,
            domain: result.domain,
            https: result.https,
            webpushDomain: result.webpushDomain,
            debug: result.debug,
            status: result.status,
            promptDelay: result.promptDelay,
            serviceWorkerName: result.serviceWorkerName,
            manifestName: result.manifestName,
          };
          upload({
            configuration: {
              filename: 'config.js',
              dir: result.id,
              data: {
                configuration: JSON.stringify(baseConfig),
                source: SOURCE_URL,
              },
            },
          })
            .then(() => { res.json(result); })
            .catch((error) => {
              logging.error(error);
              res.status(400).json({ message: '웹 사이트 수정 - 수정 파일 업로드에 에러가 있습니다.' });
            });
        });
    });
  } else {
    res.status(400).json({ message: '웹 사이트 수정 - 수정할 웹 사이트 정보가 입력되지 않았습니다.' });
  }
});
// 삭제를 진행하지만 실제로 DB 에서 삭제를 하지 않고 임시적으로 데이터 삭제 표시만 진행
// 스크립트 파일은 삭제한다.
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  if (id) {
    /*
    findAndUpdate는 결과물을 내놓을 때 files object에 $init이란 property를 남김으로써 오류를 발생시킨다.
    그래서 findOne과 updateOne으로 분리하였다.
    console.log(Object.keys(result.files));
     */
    Website.findOne({
      _id: req.params.id,
    })
      .lean()
      .exec((error, result) => {
        if (error) {
          logging.error(error);
          res.status(400).json({ message: '웹 사이트 삭제 - 삭제에 오류가 있습니다.' });
        }
        Website.updateOne({
          _id: result._id,
        }, {
          $set: { status: -1 },
        }, (error, r) => {
          if (error) {
            logging.error(error);
            res.status(400).json({ message: '웹 사이트 삭제 - 삭제에 오류가 있습니다.' });
          }
          if (r) {
            remove(result.files)
              .then(() => res.json({ result: true }))
              .catch((error) => {
                logging.error(error);
                res.status(400).json({ message: '웹 사이트 삭제 - 오류가 있습니다..' });
              });
          } else {
            res.status(400).json({ message: '웹 사이트 삭제 - 삭제할 웹 사이트가 없습니다.' });
          }
        });
      });
  } else {
    res.status(400).json({ message: '웹 사이트 삭제 - 삭제할 웹 사이트 정보가 입력되지 않았습니다.' });
  }
});

export default router;
