var mongoose = require ("mongoose");
var Schema = mongoose.Schema;
var departmentsSchema = Schema({
    name:{type:String , required:true},
    description:{type:String , required: true}
})

module.exports = mongoose.model('departments', departmentsSchema);