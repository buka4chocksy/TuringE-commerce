var service = require('../service/categoriesService');
module.exports = function categoriesController (){
    this.create =(req,res) =>{
        var options ={
            name:req.body.name,
            description:req.body.description,
            department_id:req.body.departmentid
        }
        service.CreateCategories(options).then(data =>{
            res.status(200).send(data);
        }).catch(err =>{ res.status(500).send(err)});
    }

    this.getAll = (req, res)=>{
        service.getAllCategories(req.params.pagenumber, req.params.pagesize).then(data =>{
            res.status(200).send(data);
        }).catch(err =>{ res.status(500).send(err)});
    }

    this.getById = (req,res)=>{
        service.getCategoryById(req.params.id).then(data =>{
            res.status(200).send(data);   
        }).catch(err =>{ res.status(500).send(err)});
    }
}