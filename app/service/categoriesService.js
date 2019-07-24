var model = require('../models/categories');
var BaseRepository = require('../repositories/baserepository');
var categoriesRepo = new BaseRepository(model);

exports.CreateCategories = (options)=>{
   return new Promise((resolve, reject)=>{
    var data = {
        name:options.name,
        description:options.description,
        department_id:options.department_id
    }
    model.findOne({name:data.name}).then(found =>{
        if(found){
            resolve({status: 400 ,  code:'CAT_04' , message:'Category  already exists '});
        }else{
            categoriesRepo.add(data).then(created =>{
                if(created){
                    resolve({status: 200 , message:'Category created successfully !!'});
                }else{
                    resolve({status: 400 ,  code:'CAT_04' , message:'Unable to create Category !! '});
                }
            })
        }
    }).catch(err =>{
        reject({message:err });
    })
   })
}

exports.getAllCategories = (pagenumber = 1, pagesize = 20)=>{
    return new Promise((resolve , reject)=>{
        model.find() .populate({path:'department_id', model:'departments',  select: { _id: 0, __v: 0 } })
        .skip((parseInt(pagenumber - 1) * parseInt(pagesize))).limit(parseInt(pagesize))
        .exec((err,category)=>{
            if(err)reject({message:err});
            if(category){
                resolve({status: 200 , message: category});   
            }else{
                resolve({status: 400 ,  code:'CAT_04' , message:'Unable to get Categories !! '}); 
            }
        })
    })
}

exports.getCategoryById = (id)=>{
    return new Promise((resolve , reject)=>{
        model.findById({_id:id}).populate({path:'department_id', model:'departments',  select: { _id: 0, __v: 0 } })
        .exec((err,category)=>{
            if(err)reject({message:err});
            if(category){
                resolve({status: 200 , message: category});   
            }else{
                resolve({status: 400 ,  code:'CAT_04' , message:'Unable to get Category !! '}); 
            }
        })
    })
}