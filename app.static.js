const express = require('express');
const app = express();
const path = require('path');

app.use(
  '/cdn/feed/image',
  express.static(path.join(__dirname, 'cdn/feed/image'))
);
app.use(
  '/cdn/feed/image',
  express.static(path.join(__dirname, 'cdn/feed/image'))
);
app.use(
  '/cdn/letter/image',
  express.static(path.join(__dirname, 'cdn/letter/image'))
);
app.use(
  '/cdn/letter/image',
  express.static(path.join(__dirname, 'cdn/letter/image'))
);
app.use(
  '/cdn/profile/image',
  express.static(path.join(__dirname, 'cdn/profile/image'))
);
app.use(
  '/cdn/profile/image',
  express.static(path.join(__dirname, 'cdn/profile/image'))
);

module.exports = app;