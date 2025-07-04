const express = require('express');
const router  = express.Router();
const axios   = require('axios');

// GET /auth/lazada/callback?code=...&state=...
router.get('/', async (req, res) => {
  const { code, state } = req.query;
  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  try {
    // Exchange code for tokens
    const response = await axios.get(
      'https://auth.lazada.com/rest/auth/token',
      {
        params: {
          grant_type:   'authorization_code',
          code,
          app_key:      process.env.LAZADA_CLIENT_ID,
          app_secret:   process.env.LAZADA_CLIENT_SECRET,
          redirect_uri: process.env.LAZADA_CALLBACK_URL
        }
      }
    );

    const data = response.data;
    // TODO: persist tokens (data.access_token, data.refresh_token, data.expires_in)
    return res.json({
      message:       'Tokens received',
      access_token:  data.access_token,
      refresh_token: data.refresh_token,
      expires_in:    data.expires_in
    });

  } catch (error) {
    console.error('Token exchange failed:', error.response?.data || error.message);
    return res.status(500).json({ error: error.response?.data || error.message });
  }
});

module.exports = router;
