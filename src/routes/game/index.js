import express from 'express';
import passport from 'passport';
import logging from '../../logging';
import {
  Game,
  Fault,
  Word,
} from '../../models';
import makeGame from './lib/makeGame';

const router = express.Router();

const NAME = '시험';
router.get(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const personId = req.user._id;
    Fault.find({ person: personId, weight: { $gt: 0 } })
      .lean()
      .exec((error, faults) => {
        if (error) {
          logging.error(error);
          return res.status(500).json({ message: `${NAME} 조회 오류` });
        }
        return Word.find({})
          .lean()
          .exec((error, words) => {
            if (error) {
              logging.error(error);
              return res.status(500).json({ message: `${NAME} 조회 오류` });
            }
            const exam = makeGame(words, faults);
            if (exam) {
              return res.json(exam);
            } else {
              return res.status(500).json({ message: `${NAME} 조회 오류` });
            }
          });
      });
  },
);
router.post(
  '/personHistory',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const personId = req.user._id;
    Game.find({
      person: personId,
    })
      .lean()
      .sort({ datetime: -1 })
      .exec((error, result) => {
        if (error) {
          logging.error(error);
          return res.status(500).json({ message: `${NAME} 조회 오류` });
        }
        return result;
      });
  },
);
router.post(
  '/add',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const personId = req.user._id;
    const { words } = req.body;
    new Game({
      person: personId,
      words,
    })
      .save((error, result) => {
        if (error) {
          logging.error(error);
          return res.status(500).json({ message: `${NAME} 생성 오류` });
        }
        return result;
      });
  },
);
export default router;
