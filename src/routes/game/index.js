import express from 'express';
import passport from 'passport';
import logging from '../../logging';
import {
  Game,
} from '../../models';

const router = express.Router();

const NAME = '시험';
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
