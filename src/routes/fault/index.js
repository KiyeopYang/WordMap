import express from 'express';
import passport from 'passport';
import logging from '../../logging';
import {
  Fault,
} from '../../models';

const router = express.Router();

const NAME = '틀린 단어';
router.get(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const personId = req.user._id;
    Fault
      .find({ person: personId })
      .lean()
      .exec((error, result) => {
        if (error) {
          logging.error(error);
          return res.status(500).json({ message: `${NAME} 조회 에러` });
        }
        return res.json(result);
      });
  },
);
router.post(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const personId = req.user._id;
    const {
      faults,
    } = req.body;
    const bulks = [];
    faults.forEach((fault) => {
      bulks.push({
        updateOne: {
          filter: {
            person: personId,
            wordId: fault.wordId,
          },
          update: {
            person: personId,
            wordId: fault.wordId,
            word: fault.word,
            meaning: fault.meaning,
            weight: fault.weight,
          },
          upsert: true,
        },
      });
    });
    Fault.bulkWrite(bulks, (error, result) => {
      if (error) {
        logging.error(error);
        return res.status(500).json({ message: `${NAME} 추가 에러` });
      }
      return res.json(result);
    });
  },
);

export default router;
