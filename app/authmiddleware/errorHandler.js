var joiValidator = require('../validators/index');
module.exports.schemaValidatorHandler = function (schema) {
	return async function (req, res, next) {
		console.log("request body", req.body)
		joiValidator(req.body, schema).then(result => {
			next();
		}).catch(error => {
			res.status(400).send(error);
		});
	};
}