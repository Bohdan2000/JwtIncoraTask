const express = require('express');

const productController = require('./controller');
const middleware = require('../../middleware/index');

const router = express.Router();

router
    .get('/' , productController.getAllProducts)
    .post('/', middleware.check, productController.createProduct)
    .get('/:id', productController.getOneProduct)
    .delete('/:id', middleware.check,productController.deleteProduct)
    .put('/:id', middleware.check, productController.updateProduct)

module.exports = router;