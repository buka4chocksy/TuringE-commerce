var service = require('../service/shippingService');

module.exports =  function shippingController(){
    this.Create = (req,res)=>{
        var Options = {
            shipping_Region:req.body.name
        }
        service.createShipping(Options).then(data =>{
            res.status(200).send(data)
        }).catch(err =>{
            res.status(500).send(err);
        })
    }

    this.getShippingRegions = (req, res)=>{
        service.getShippingRegions().then(data =>{
            res.status(200).send(data);
        }).catch(err =>{
            res.status(500).send(err);
        })
    }

    this.getShippingById = (req, res)=>{
        service.getShippingRegionById(req.params.id).then(data =>{
            res.status(200).send(data)
        }).catch(err =>{
            res.status(500).send(err);
        })
    }
} 