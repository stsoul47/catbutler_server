const mongoose = require('mongoose');
const MONGO = process.env.MONGO;
const connect = () => {
  mongoose
    .connect(MONGO)
    .then(()=>{
      console.log("몽고디비 연결 성공");
    })
    .catch(err => console.log(err));
};

mongoose.connection.on("error", err => {
  console.error("몽고디비 연결 에러", err);
});

mongoose.connection.on("disconnected", err => {
  console.error("몽고디비 연결 끊김", err);
});

module.exports = connect;