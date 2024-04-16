const express = require('express');
const app = express();
const path = require('path');

app.use(
  '/cdn/item_main_image/image',
  express.static(path.join(__dirname, 'cdn/item_main_image/image'))
);

app.use(
  '/cdn/item_detail_image/image',
  express.static(path.join(__dirname, 'cdn/item_detail_image/image'))
);

app.use(
  '/cdn/item_detail_image/temp',
  express.static(path.join(__dirname, 'cdn/item_detail_image/temp'))
);


module.exports = app;