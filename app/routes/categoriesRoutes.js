var categoriesController = require('../controllers/categoriesController');
var router = require('express').Router();
module.exports = function(){
    const catCtrl = new categoriesController();
    router.post('/' ,  catCtrl.create);
     router.get('/:pagenumber/:pagesize' , catCtrl.getAll);
     router.get('/:id', catCtrl.getById);

    return router;
}