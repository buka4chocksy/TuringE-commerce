var customerService = require('../service/customerService');
var baseRepository = require('../repositories/baserepository');
var Customer = require('../models/customers');
var customerRepo = new baseRepository(Customer);

exports.authenticate = function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token){
        customerService.verifyToken(token).then(decoded =>{
            if(decoded){
                customerRepo.getSingleBy({email: decoded.email}).then(detail =>{
                    if(detail  == null){
                        res.status(401).send({message: "User does not exist" });
                    }else{
                        req.auth ={
                            email:decoded.email,
                            id:detail._id
                        }
                        next();

                    }
                })
            }
        }).catch(err =>{
            res.status(401).send({  message: "No token provided", data:err });
        })
    }

}