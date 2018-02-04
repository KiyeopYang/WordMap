import express from 'express';

const router = express.Router();

router.get('/data.jpg', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  console.log(req.query);
  // NOT CONTENT
  res.status(204).end();
});

export default router;
