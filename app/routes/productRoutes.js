var productController = require('../controllers/productController');
var multer = require('../authmiddleware/multer');
var router = require('express').Router();
module.exports = function(){
    const prodCtrl = new productController();
    router.post('/', multer.upload.single('image'), prodCtrl.createProduct);  
    router.get('/search/:search', prodCtrl.SearchProduct);
    router.get('/:pagenumber/:pagesize' , prodCtrl.getAll);
    router.get('/:id' , prodCtrl.getyById);


    return router;
}



