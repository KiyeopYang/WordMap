import express from 'express';
import website from './website';
import webpush from './webpush';
import email from './email';
import result from './result';
import reserved from './reserved';

const router = express.Router();

router.use('/website', website);
router.use('/webpush', webpush);
router.use('/email', email);
router.use('/result', result);
router.use('/reserved', reserved);

export default router;
