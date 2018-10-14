
const Joi = require('joi');

module.exports = [
	{
		method: 'GET',
		path: '/sequence/{id}',
		config: { 
			handler: require('../../handlers/sequence').get,
			validate: { 
				params: { id: Joi.string().guid({ version: ['uuidv4'] }) } 
			}
		}
	},
	{
		method: 'GET',
		path: '/sequence/info',
		config: {
			handler: require('../../handlers/sequence').getInfo,
			validate: {
				query: { userId: Joi.string().guid({ version: ['uuidv4' ] }) }
			}
		}
	}
]
