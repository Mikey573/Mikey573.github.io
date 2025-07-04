router.get('/', async (req, res) => {
  const { code } = req.query;
  console.log('Received code:', code);

  try {
    const { data } = await axios.get(
      'https://auth.lazada.com/rest/auth/token',
      { params: {
          grant_type:   'authorization_code',
          code,
          app_key:      process.env.LAZADA_CLIENT_ID,
          app_secret:   process.env.LAZADA_CLIENT_SECRET,
          redirect_uri: process.env.LAZADA_CALLBACK_URL
        }
      }
    );

    console.log('Lazada responded:', data);
    // ส่ง token กลับ browser/HTTP client ด้วย
    return res.json({
      access_token:  data.access_token,
      refresh_token: data.refresh_token,
      expires_in:    data.expires_in
    });

  } catch (err) {
    console.error('Error exchanging token:', err.response?.data || err.message);
    return res.status(500).json({ error: 'Token exchange failed', detail: err.response?.data || err.message });
  }
});
