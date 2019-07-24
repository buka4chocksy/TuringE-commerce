var model = require ('../models/customers');
var BaseRepository = require('../repositories/baserepository');
var customerRepo = new BaseRepository(model);
var secret = process.env.Secret;
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

exports.RegisterCustomer = (option)=>{
    return new Promise((resolve, reject)=>{
        let hash = bcrypt.hashSync(option.password , 10);
        var CustomerDetails = {
           name	:option.name,
           email:option.email,
           password:hash,
           address_1:option.address_1,
           address_2:option.address_2,
           city:option.city,
           region:option.region,
           postal_code:option.postal_code,
           country:option.country,
           shipping_region_id:option.shipping_region_id,
           day_phone:option.day_phone,
           eve_phone:option.eve_phone,
           mob_phone:option.mob_phone,
           credit_card:option.credit_card
        }
        model.findOne({email:CustomerDetails.email}).then(exists =>{
            if(exists){
                resolve({status:400 , code:"USR_04" , message:'The email already exists !!' , "field":"email"});
            }else{
                var registered = customerRepo.add(CustomerDetails);
                if(registered){
                    resolve({status:200 , message:"Customer registration successfull !!" })
                }
            }
        }).catch(err =>{
            reject({message:err});
        })
    })
}

function login(username , password){
    return new  Promise((resolve , reject)=>{
        if(username.length == 0 || password.lenght == 0){
            resolve({status:400 , message:' authentication credentials incomplete' })
        }else{
            customerRepo.getSingleBy({email: username},'').then((user)=>{
                if(!user){
                    resolve({status:400 , message:'could not authenticate user'});
                }else{
                    var validPassword = bcrypt.compareSync(password, user.password);
                    if(validPassword){
                        getUserDetail(user,user.id).then(userdetail =>{
                            generateToken(userdetail).then((token)=>{
                                resolve({success:true , data: {user, token : token }, message: 'authentication successful'})
                            }).catch((err)=>{
                                resolve({success: false, data:err, message:'could not authenticate user'})
                            })
                            })
                    }else{
                        resolve({success: false, message:'incorrect email or password'})
 
                    }
                }
            
            }).catch((err)=>{
                reject(err);
            })
        }
    })
}

exports.login = login;

exports.getCustomerById = (token)=>{
    return new Promise((resolve , reject)=>{
        if(token){
            verifyToken(token).then(decoded =>{
                customerRepo.getSingleBy({email:decoded.email}).then(data =>{
                 if(data){
                     resolve({status:200 , message:data});
                 }else{
                   resolve({status:400 , message:'could not fetch user'})
                 }
             })
         }).catch( err =>{
             reject({message: err})
         })  
        }else{
            res.status(400).send({  message: "No token provided" });
        }
    })
}

function getUserDetail(user,Id){
    return new Promise((resolve, reject)=>{
        customerRepo.getSingleBy({_id:Id}, {"_id" : 0, "__v" : 0}).then(data =>{
                var specificUserDetail = {email: user.email,   mob_phone: user.mob_phone};
                userdetail = {...data.toObject(),...specificUserDetail};
                resolve(userdetail);
            }).catch(error => reject(error));
        
    })
}

exports.login = login

function generateToken(data ={}){
    return new Promise((resolve, reject)=>{
        jwt.sign({...data}, secret, {expiresIn: '24hrs'}, function(err, token){
            if(err){
                reject(err);
            }else{
                resolve(token);
            }
        });
    })
}

exports.generateToken = generateToken;

function verifyToken (token= ""){
    return new Promise((resolve, reject)=>{
        jwt.verify(token.replace("Bearer", ""), secret, function(err, decodedToken ){
            if(err){
                reject(err);
            }else{
                resolve(decodedToken);
            }
        });
    });
};
exports.verifyToken = verifyToken;


exports.updateCustomer = (id, data)=>{
    return new Promise((resolve, reject)=>{
        console.log(data , '-------------')
        customerRepo.updateByQuery({_id:id}, data).then(updated =>{
            if(updated){
                customerRepo.getById(updated._id).then(customer =>{
                 resolve({status:200 , message:customer}); 
                })
            }
        }).catch(err =>{
            reject({message:err});
        })
    })
}