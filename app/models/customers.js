var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var customersSchema = Schema({
 name	:{type:String , required:true},
 email:{type:String , required:true},
 password:{type:String, required:true},
address_1:{type:String , required:true},
address_2:{type:String , required:true},
city:{type:String , required:true},
region:{type:String , required:true},
postal_code:{type:Number , required:true},
country:{type:String , required:true},
shipping_region_id:{type: mongoose.SchemaTypes.ObjectId, ref: "shipping"},
day_phone:{type:String , required:true},
eve_phone:{type:String , required:true},
mob_phone:{type:String , required:true},
credit_card:{type:String , required:true}
})

module.exports = mongoose.model('customers', customersSchema);