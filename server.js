const app = require('./app');
const connect = require('./src/models/mongoConnect');
connect();
const server = app.listen(
  { port: process.env.PORT || 60001, host: '0.0.0.0' },
  () => {
    const port = server.address().port;

    console.log(`Example app listening at http://localhost:${port}`);
    console.log(`Swagger Api Docs at http://localhost:${port}/api-docs`);
  }
);
