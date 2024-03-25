// const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

// const doc = {
//   info: {
//     title: 'jellymong',
//     description: 'jellymong swagger docs'
//   },
//   host: 'localhost:60001'
// }

// const outputFile = './swagger-output.json';
// const routes = ['src/routes/**/*.js'];

// swaggerAutogen(outputFile, routes, doc);

const swaggerJSDoc = require('swagger-jsdoc')

const swaggerDefinition = {
	"openapi": '3.1.0',
	"info": {
		"description": 'jellymong swagger docs.',
		"version": '1.0.0',
		"title": 'jellymong',
	},
	"host": 'localhost:60001',
	"schemes": ['https', 'http'],
	"consumes": ['application/json'],
	"produces": ['application/json']
}

const options = {
	swaggerDefinition,
	apis: ['server.js', 'src/routes/**/*.js', 'swagger/**/*.js']
}

const swaggerSpec = swaggerJSDoc(options)

module.exports = {
	swaggerSpec
}
