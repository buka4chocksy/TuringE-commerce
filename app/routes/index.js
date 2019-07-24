var shippingRoutes = require('../routes/shippingRoutes');
var customerRoutes = require('./customersRoutes');
module.exports = function(router){
 router.use("/shipping" , shippingRoutes());
 router.use("/customers", customerRoutes());


 return router;
}