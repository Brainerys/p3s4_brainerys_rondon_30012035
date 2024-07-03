var express = require('express');
var router = express.Router();

const controllers = require('../controllers/controllerRoutes');

router.get('/dashboard', (req, res, next) => res.render('index'));

router.get('/productos',(req,res) => controllers.dataProducts(req,res));
router.post('/productos',(req,res) => controllers.insertProducts(req,res));

router.get('/productos/editar/:id',(req,res) => controllers.editProducts(req,res));
router.post('/productos/editar/:id',(req,res) => controllers.editProductPost(req,res));
router.get('/productos/eliminar/:id',(req,res) => controllers.deleteProduct(req,res));

router.get('/categorias',(req,res) => controllers.dataCategorys(req,res));
router.post('/categoria',(req,res) => controllers.insertCategorys(req,res));

router.get('/categoria/editar/:id',(req,res) => controllers.editCategorys(req,res));
router.post('/categoria/editar/:id',(req,res) => controllers.setEditCategory(req,res));
router.get('/categoria/eliminar/:id',(req,res) => controllers.deleteCategory(req,res));




module.exports = router;
