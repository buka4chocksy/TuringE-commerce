var shippingController = require('../controllers/shippingControllers');
//var authMiddleware = require('../middlewares/AuthMiddleware');
var router = require('express').Router();
module.exports = function(){
    const shippingCtrl = new shippingController();
    router.post('/' ,  shippingCtrl.Create);
    router.get('/regions' , shippingCtrl.getShippingRegions);
    router.get('/regions/:id', shippingCtrl.getShippingById);

    return router;
}