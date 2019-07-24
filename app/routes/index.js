var shippingRoutes = require('../routes/shippingRoutes');
var customerRoutes = require('./customersRoutes');
var departmentRoutes = require('../routes/departmentRoutes');
var categoriesRoutes = require('../routes/categoriesRoutes');
var productRoutes = require('../routes/productRoutes');
module.exports = function(router){
 router.use("/shipping" , shippingRoutes());
 router.use("/customers", customerRoutes());
 router.use("/departments", departmentRoutes());
 router.use("/categories", categoriesRoutes());
 router.use("/products", productRoutes());


 return router;
}