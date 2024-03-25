const testModel = require('../models/testModels');

module.exports = {
	getTest: async () => {
		return '조회 테스트 성공';
	},
	saveTest: async (data) => {
		const newTest = new testModel({
			name: data.name,
			age: data.age
		})
		const result = await newTest.save();
		console.log("result", result);
	}
}