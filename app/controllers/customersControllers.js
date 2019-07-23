var service = require("../service/customerService");

module.exports = function authController  (){
    this.Register = (req,res)=>{
     var option = {
        name	:req.body.name,
        email: req.body.email,
        password:req.body.password,
        address_1:req.body.address1,
        address_2:req.body.address2,
        city:req.body.city,
        region:req.body.region,
        postal_code:req.body.postalcode,
        country:req.body.country,
        shipping_region_id:req.body.shippingregion,
        day_phone:req.body.dayphone,
        eve_phone:req.body.evephone,
        mob_phone:req.body.mobphone,
        credit_card:req.body.creditcard
     } 
     service.RegisterCustomer(option).then(data =>{
         res.status(200).send(data);
     }).catch(err =>{
         res.status(500).send(err);
     }) 
    }

   this.login = (req, res)=>{
       
    var username = req.body.username
    var password = req.body.password
    service.login(username , password).then(data =>{
        res.status(200).send(data); 
    }).catch(err =>{
        res.status(500).send(err);
    }) 
   }
}