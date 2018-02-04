import express from 'express';
import word from './word';
import fault from './fault';
import person from './person';
import game from './game';

const router = express.Router();

router.use('/word', word);
router.use('/fault', fault);
router.use('/person', person);
router.use('/game', game);

export default router;
