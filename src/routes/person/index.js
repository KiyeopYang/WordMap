import express from 'express';
import passport from 'passport';
import logging from '../../logging';
import {
  Person,
} from '../../models';

const router = express.Router();

const NAME = '유저';
router.get(
  '/auth',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const { user } = req;
    if (user) {
      return res.json(user);
    }
    return res.json(null);
  },
);
router.post('/', (req, res) => {
  const {
    phone,
  } = req.body;
  Person.findOne({
    phone,
  })
    .lean()
    .exec((error, result) => {
      if (error) {
        return res.status(500).json({ message: `${NAME} 조회 오류` });
      }
      if (result) {
        return res.json(result);
      }
      return new Person({
        phone,
      })
        .save((error, result) => {
          if (error) {
            return res.status(500).json({ message: `${NAME} 생성 오류` });
          }
          return res.json(result);
        });
    });
});
router.delete(
  '/',
  passport.authenticate('bearer', { session: false }),
  (req, res) => {
    const personId = req.user._id;
    Person
      .deleteOne(
        { _id: personId },
        (error, result) => {
          if (error) {
            logging.error(error);
            return res.status(500).json({ message: `${NAME} 삭제 에러` });
          }
          return res.json(result);
        },
      );
  },
);

export default router;
