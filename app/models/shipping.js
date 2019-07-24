var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var shippingSchema = Schema({
    shipping_Region:{type:String , required:true}
})

module.exports = mongoose.model('shipping', shippingSchema);