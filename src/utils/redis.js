const redis = require('redis');

// console.log("REDIS_HOST", process.env.REDIS_HOST);
// console.log("REDIS_PORT", process.env.REDIS_PORT);
const redisClient = redis.createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
  legacyMode: true,
});
redisClient.on('connect', () => console.log('Connected to Redis'));
redisClient.on('error', (err) => console.log('Redis Client Error', err));
redisClient.connect().then();

const redisCli = redisClient.v4;
module.exports = redisCli;