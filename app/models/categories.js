var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var categoriesSchema = Schema({
    name:{type:String , required:true},
    description:{type:String , required:true},
    department_id:{type: mongoose.SchemaTypes.ObjectId, ref: "departments" }
})

module.exports = mongoose.model('categories', categoriesSchema);