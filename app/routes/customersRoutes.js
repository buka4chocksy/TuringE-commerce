var authController = require('../controllers/customersControllers');
var validator = require('../authmiddleware/errorHandler');
var customerSchema = require('../validators/customers')
var RouteValidator = require('../authmiddleware/routevalidator');
var router = require('express').Router();
module.exports = function(){
    const authCtrl = new authController();
    router.post('/' ,[validator.schemaValidatorHandler(customerSchema.schema)],  authCtrl.Register);
    router.post('/login',authCtrl.login )
    router.get('/:id',authCtrl.getCustomer )
    router.put('/', RouteValidator.authenticate , authCtrl.updateCustomer )

    return router;
}