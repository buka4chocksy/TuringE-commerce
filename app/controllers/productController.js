var service = require('../service/productService');
var cloudinary = require('../authmiddleware/cloudinary');
module.exports = function productControllers(){
    this.createProduct = async(req, res)=>{
        var options = {
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            department_id:req.body.departmentid,
            category_id:req.body.categoryid,
            discounted_price:req.body.discountedprice,
            image: (req.file != null && req.file !== undefined) ? req.file.path : null
        }
        if(req.image !== null && req.file !== undefined){
            await cloudinary.uploadToCloud(options.image).then((img)=>{
                console.log("Cloudinary details recieved", img.url);
                options.imageUrl = img.url;
                options.imageID = img.ID;
                return options;
            });
        }
        service.createProduct(options)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(err => {
            res.status(500).send(err);
        });
    }

    this.getAll = (req, res)=>{
        service.getAllProducts(req.params.pagenumber, req.params.pagesize).then(data =>{
            res.status(200).send(data);
        }).catch(err =>{ res.status(500).send(err)});
    }

    this.SearchProduct = (req,res)=>{
        console.log(req.params , 'data -------')
        service.SearchProducts(req.params.search)
        .then(data =>{
            res.status(200).send(data);
        }).catch(err =>{
            res.status(500).send(err);
        })
    }

    this.getyById = (req, res)=>{
        service.getProductsById(req.params.id).then(data =>{
            res.status(200).send(data);
        }).catch(err =>{ res.status(500).send(err)});
    }
}


