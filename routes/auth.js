const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

router.get('/login', (req, res) => {
    const redirectUri = encodeURIComponent(process.env.FACEBOOK_REDIRECT_URI);
    const url = `https://www.facebook.com/v19.0/dialog/oauth?client_id=${process.env.FACEBOOK_APP_ID}&redirect_uri=${redirectUri}&scope=pages_messaging,pages_read_engagement,pages_show_list&response_type=code`;
    res.redirect(url);
});

router.get('/callback', async (req, res) => {
    const code = req.query.code;
    if (!code) return res.status(400).send('Code missing');

    try {
        const tokenRes = await axios.get(`https://graph.facebook.com/v19.0/oauth/access_token`, {
            params: {
                client_id: process.env.FACEBOOK_APP_ID,
                redirect_uri: process.env.FACEBOOK_REDIRECT_URI,
                client_secret: process.env.FACEBOOK_APP_SECRET,
                code
            }
        });
        const accessToken = tokenRes.data.access_token;
        res.send(`Access Token received: ${accessToken}`);
    } catch (error) {
        res.status(500).send('Token exchange failed');
    }
});

module.exports = router;
