var service = require('../service/departmentService');
 module.exports  = function departmentControllers(){
     this.create = (req,res)=>{
         var options = {
            name:req.body.name,
            description:req.body.description
         }
         service.createdDepartment(options).then(data =>{
             res.status(200).send(data);
         }).catch( err =>{
             res.status(500).send(err);
         });
     }

     this.getAll = (req, res)=>{
         service.getAllDepartments().then(data =>{
            res.status(200).send(data);
        }).catch( err =>{
            res.status(500).send(err);
        });
     }

     this.getById = (req, res)=>{
         service.getDepartmentById(req.params.id).then(data =>{
            res.status(200).send(data);  
         }).catch( err =>{
            res.status(500).send(err);
        })
     }
 }