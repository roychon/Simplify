const express = require('express');
const app = express(); // initialize express app
const cors = require('cors');
const fileUpload = require('express-fileupload');
const shortid = require('shortid');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const fs = require('fs');
const simplifyController = require('./controllers/simplifyController');

const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || '3000';

// MIDDLEWARE
app.use(express.json());
app.use(fileUpload());
app.use(
  cors({
    credentials: true, // allow cookies and credentials in CORS requests
    origin: process.env.CORS_ORIGIN, // allowed access origins
  })
);

// ROUTES
app.get('/', (req, res) => {
  res.json({ user: 'Roy' });
});

app.post('/simplify-text', simplifyController.simplifyText);

app.post('/simplify-file', simplifyController.simplifyFile);

// START SERVER
app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on('error', (e) => {
    console.log(e);
  });
