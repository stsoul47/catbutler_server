const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

let envPath;

switch (process.env.NODE_ENV) {
  case 'production':
    envPath = `${__dirname}/.env.prd`;
    console.log(envPath);
    break;
  case 'development':
    envPath = `${__dirname}/.env.dev`;
    console.log(envPath);
    break;
  case 'test':
    envPath = `${__dirname}/.env.test`;
    console.log(envPath);
    break;
  default:
    envPath = path.join(__dirname,'.env');
}

dotenv.config({ path: envPath });

const express = require('express');
const app = express();
const requestErrorHandler = require('./src/middlewares/errorHandler');
const appStatic = require('./app.static');

// const passportConfig = require('./src/passport');
// passportConfig();

app.enable('trust proxy');
app.set('trust proxy', () => true);

if(process.env.NODE_ENV === 'development') {
  const swaggerUi = require('swagger-ui-express');
  const { swaggerSpec } = require('./swagger');
  
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

app.use(
  cors({
    exposedHeaders: ['AccessToken'],
    origin: '*',
  })
);

app.use(express.json());
app.use(express.text());

app.use(appStatic);

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use('/*', function (req, res, next) {
  console.log(
    'api 호출',
    new Date() + ' [' + req.method + '] ' + req.baseUrl + ' ' + req.ip
  );
  next();
});

const routerIndex= require('./src/routes/routerIndex');
app.use('/', routerIndex);

app.use(requestErrorHandler.logHandler);
app.use(requestErrorHandler.errorHandler);

app.use((req, res, next) => {
  res.status(404).send('404 NOT FOUND');
});

module.exports = app;