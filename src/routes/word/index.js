import express from 'express';
import logging from '../../logging';
import passport from 'passport';
import {
  Fault,
  Word,
} from '../../models';

const router = express.Router();

const NAME = '단어';
router.get(
  '/length',
  (req, res) => {
    Word.count({}, (error, result) => {
      if (error) {
        logging.error(error);
        return res.status(500).json({ message: `${NAME} 조회 에러` });
      }
      return res.json(result);
    });
  },
);
router.get('/', (req, res) => {
  Word
    .find({})
    .lean()
    .exec((error, result) => {
      if (error) {
        logging.error(error);
        return res.status(500).json({ message: `${NAME} 조회 에러` });
      }
      return res.json(result);
    });
});
router.post('/', (req, res) => {
  const {
    words,
  } = req.body;
  const bulks = [];
  words.forEach((word) => {
    bulks.push({
      updateOne: {
        filter: {
          word: words.word,
        },
        update: {
          word: word.word,
          meaning: word.meaning,
        },
        upsert: true,
      },
    });
  });
  Word.bulkWrite(bulks, (error, result) => {
    if (error) {
      logging.error(error);
      return res.status(500).json({ message: `${NAME} 추가 에러` });
    }
    return res.json(result);
  });
});
router.put('/', (req, res) => {
  const {
    wordId,
    word,
    meaning,
  } = req.body;
  Word
    .updateOne(
      { _id: wordId },
      {
        $set: {
          word,
          meaning,
        },
      },
      (error, result) => {
        if (error) {
          logging.error(error);
          return res.status(500).json({ message: `${NAME} 수정 에러` });
        }
        return res.json(result);
      },
    );
});
router.delete('/', (req, res) => {
  const {
    wordId,
  } = req.body;
  Word
    .deleteOne(
      { _id: wordId },
      (error, result) => {
        if (error) {
          logging.error(error);
          return res.status(500).json({ message: `${NAME} 삭제 에러` });
        }
        return res.json(result);
      },
    );
});

export default router;
