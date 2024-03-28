const redis = require('./redis');

module.exports = {
	getRedisData: async function(key) {
		try {
			const data = await redis.get(key);
			return data;
		} catch (error) {
			throw new Error(error);
		}
	},
	setRedisData: async function (key, value, expire) {
		try {
			await redis.set(key, value);
			await redis.expire(key, (expire));
			return true;
		} catch (error) {
			throw new Error(error);		
		}
	}
}
