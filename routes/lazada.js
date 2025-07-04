const router = require('express').Router();

router.get('/callback', (req, res) => {
  const { code, state } = req.query;
  // Exchange code for tokens here…
  res.send(`Received code=${code}`);
});

module.exports = router;
