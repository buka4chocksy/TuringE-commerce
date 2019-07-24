var model = require('../models/departments');
var BaseRepository = require('../repositories/baserepository');
var departmentRepo = new BaseRepository(model);

exports.createdDepartment = (options)=>{
    return new Promise((resolve , reject)=>{
        var details ={
            name:options.name,
            description:options.description
        }
        model.findOne({name:details.name}).then( found =>{
            if(found){
                resolve({status: 400 ,  code:'DEPT_04' , message:'Department  already exists '});
            }else{
                departmentRepo.add(details).then(created =>{
                    if(created){
                        resolve({status: 200 , message:'department created successfully !!'});
                    }else{
                        resolve({status: 400 ,  code:'DEPT_04' , message:'Unable to create department !! '});
                    }
                })
            }
        }).catch(err =>{
            reject({message:err});
        })
    })
}


exports.getAllDepartments = ()=>{
    return new Promise((resolve , reject)=>{
        departmentRepo.getAll().then(got =>{
            if(got){
                resolve({status: 200 , message:got});
            }else{
                resolve({status: 400 ,  code:'DEPT_04' , message:'Unable to find departments !! '});   
            }
        }).catch(err =>{
            reject({message:err});  
        })
    })
}

exports.getDepartmentById = (id)=>{
    return new Promise((resolve, reject)=>{
        departmentRepo.getById({_id:id}).then(found =>{
            if(found){
                resolve({status: 200 , message:found});
            }else{
                resolve({status: 400 ,  code:'DEPT_04' , message:'Unable to find departments !! '});   
            }
        }).catch(err =>{
            reject({message:err});  
        })
    })
}