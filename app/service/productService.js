var model = require('../models/products');
var BaseRepository = require('../repositories/baserepository');
var productRepo = new BaseRepository(model);

exports.createProduct = (options)=>{
    return new Promise((resolve , reject)=>{
      productRepo.add(options).then(created =>{
          if(created){
            resolve({status: 200 , message:'Product created successfully !!'});
          }else{
            resolve({status: 400 ,  code:'PRD_04' , message:'Unable to create Product !! '});

          }
      }).catch(err =>{
          reject({message:err});
      })
    })
}

exports.getAllProducts = (pagenumber = 1, pagesize = 20)=>{
    return new Promise((resolve , reject)=>{
        model.find() .populate({path:'department_id', model:'departments',  select: { _id: 0, __v: 0 } })
        .populate({path:'category_id', model:'categories',  select: { _id: 0, __v: 0 } })
        .skip((parseInt(pagenumber - 1) * parseInt(pagesize))).limit(parseInt(pagesize))
        .exec((err,products)=>{
            if(err)reject({message:err});
            if(products){
                resolve({status: 200 , message: products});   
            }else{
                resolve({status: 400 ,  code:'PRD_04' , message:'Unable to get Products !! '}); 
            }
        })
    })
}

exports.SearchProducts = function (option){
    return new Promise((resolve , reject)=>{
        model.find({ $or :[{name: {$regex :option , $options : 'i' }},{ price: {$regex : option , $options: 'i'}}]})
        .populate({path:'department_id', model:'departments',  select: { _id: 0, __v: 0 } })
        .populate({path:'category_id', model:'categories',  select: { _id: 0, __v: 0 } })
        .exec((err , result)=>{
            console.log(result , 'result gotten')
            if(err) {reject(err);}
            if(result == null || Object.keys(result).length === 0){
                resolve({status: 400 ,  code:'PRD_04' , message:'Unable to get Products searched !! '}); 
            }else{
                resolve({status: 200 , message: result});   
            }
        })
    })
}

exports.getProductsById = (id)=>{
    return new Promise((resolve , reject)=>{
        model.findById({_id:id}) .populate({path:'department_id', model:'departments',  select: { _id: 0, __v: 0 } })
        .populate({path:'category_id', model:'categories',  select: { _id: 0, __v: 0 } })
        .exec((err,products)=>{
            if(err)reject({message:err});
            if(products){
                resolve({status: 200 , message: products});   
            }else{
                resolve({status: 400 ,  code:'PRD_04' , message:'Unable to get Product !! '}); 
            }
        })
    })
}