const express = require('express');
const app     = express();
const port    = process.env.PORT || 3000;

// Mount the callback router
app.use('/auth/lazada/callback', require('./auth/lazada/callback'));

app.get('/', (req, res) => {
  res.send('Lazada OAuth App is running');
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
