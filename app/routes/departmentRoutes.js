var departmentController = require('../controllers/departmentControllers');
var router = require('express').Router();
module.exports = function(){
    const deptCtrl = new departmentController();
    router.post('/' ,  deptCtrl.create);
     router.get('/' , deptCtrl.getAll);
     router.get('/:id', deptCtrl.getById);

    return router;
}