const express = require('express');
const app     = express();
const port    = process.env.PORT || 10000;

// Mount your callback handler
app.use('/auth/lazada', require('./routes/lazada'));

app.listen(port, () =>
  console.log(`Listening on https://localhost:${port}`)
);
