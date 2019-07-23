var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var productsSchema = Schema({
    name:{type:String , required:true},
    description:{type:String , required:true},
    price:{type:String , required:true},
    discounted_price:{type:String },
    imageUrl: {type: String, default:''},
    imageID: {type: String, default: ''},
})

module.exports = mongoose.model('products', productsSchema);