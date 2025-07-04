const router = require('express').Router();
const axios  = require('axios');

router.get('/callback', async (req, res) => {
  const { code, state } = req.query;
  if (!code) return res.status(400).send('Missing code');

  try {
    // Lazada’s token endpoint
    const response = await axios.get(
      'https://auth.lazada.com/rest/auth/token', {
        params: {
          code,
          app_key:    process.env.LAZADA_CLIENT_ID,
          app_secret: process.env.LAZADA_CLIENT_SECRET,
          grant_type: 'authorization_code',
          redirect_uri: process.env.LAZADA_CALLBACK_URL
        }
    });

    // The JSON payload contains access_token, refresh_token, expires_in, etc.
    const data = response.data;
    // Persist tokens securely (database, vault, etc.)
    // e.g. await saveTokens(data);

    res.json({
      message: 'Token fetched successfully',
      access_token:  data.access_token,
      refresh_token: data.refresh_token,
      expires_in:    data.expires_in
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

module.exports = router;
