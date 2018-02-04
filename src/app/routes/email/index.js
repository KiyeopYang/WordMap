import express from 'express';
import * as emailLib from '../../lib/email';
import logging from '../../../lib/logging';

const router = express.Router();

router.post('/contact', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  const { email, phone, text } = req.body;
  emailLib.sendEmail({
    title: `${email}, ${phone}의 문의 요청`,
    content: text,
  })
    .then(() => res.json({ success: true }))
    .catch((error) => {
      logging.error(error);
      res.json({ success: false });
    });
});

export default router;
