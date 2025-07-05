const express = require('express');
const router  = express.Router();
const axios   = require('axios');

router.get('/', async (req, res) => {
  const { code } = req.query;
  console.log('Received code:', code);

  try {
    // ←───────────────────────────────────────────────
    // This is where you call Lazada to exchange the code
    const { data } = await axios.get(
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

    // ←───────────────────────────────────────────────
    // Insert your logs here, immediately after axios returns
    console.log('🔑 Access Token:',  data.access_token);
    console.log('🔄 Refresh Token:', data.refresh_token);
    console.log('⏱ Expires In:',     data.expires_in);

    // Now return the JSON payload (or handle as you wish)
    return res.json({
      access_token:  data.access_token,
      refresh_token: data.refresh_token,
      expires_in:    data.expires_in
    });

  } catch (err) {
    console.error('Error exchanging token:', err.response?.data || err.message);
    return res
      .status(500)
      .json({ error: 'Token exchange failed', detail: err.response?.data || err.message });
  }
});

module.exports = router;
