var model = require('../models/shipping');
var BaseRepositories = require('../repositories/baserepository');
var shippingRepo = new BaseRepositories(model);

exports.createShipping = (Options)=>{
    return new Promise((resolve, reject)=>{
        console.log(Options.name , 'found -----')
         var n = {
            shipping_Region:Options.shipping_Region
            }
        model.findOne({shipping_Region:Options.name}).then(exists =>{
            if(exists){
                resolve({status:400  , code:'SHIP_04' , message:'shipping region already exists '});
            }else{
                shippingRepo.add(n).then(created =>{
                    if(created){
                        resolve({status: 200 , message:'Shipping region created successfully ' });
                    }else{
                        resolve({status: 400 , message:'Shipping region was not created '});
                    }
                })
            }
        }).catch(err =>{
            reject({message:err});
        })
  
    })
}

exports.getShippingRegions = ()=>{
    return new Promise((resolve , reject)=>{
        shippingRepo.getAll().then(regions =>{
            if(regions == ''){
                resolve({status: 400 ,  code:'SHIP_02' , message: 'The field example is empty '});
            }else{
                resolve({status: 200 , message:regions});
            }
        }).catch(err =>{
            reject({message: err});
        })
    })
}

exports.getShippingRegionById = (shippingId)=>{
    return new Promise((resolve , reject)=>{
        shippingRepo.getById({_id:shippingId}).then(got =>{
            if(got == ''){
                resolve({status: 400 ,  code:'SHIP_02' , message: 'The field example is empty '});

            }else{
                resolve({status: 200 , message:got});   
            }
        }).catch(err =>{
            reject({message:err});
        })
    })
}