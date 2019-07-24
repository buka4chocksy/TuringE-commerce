const joi = require('joi');

const schema = joi.object().keys({
    name:joi.string(),
    email:joi.string(),
    password:joi.string(),
    address1:joi.string(),
    address2:joi.string(),
    city:joi.string(),
    region:joi.string(),
    postalcode:joi.string(),
    country:joi.string(),
    shippingregion:joi.string(),
    dayphone:joi.string(),
    evephone:joi.string(),
    mobphone:joi.string(),
    creditcard:joi.string(),
})
module.exports = {
    schema
}