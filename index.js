const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
app.use(bodyParser.json());

const authRoutes = require('./routes/auth');
const webhookRoutes = require('./routes/webhook');

app.use('/auth/facebook', authRoutes);
app.use('/webhook', webhookRoutes);

app.get('/', (req, res) => {
    res.send('Intelekta AI Messenger API running');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
