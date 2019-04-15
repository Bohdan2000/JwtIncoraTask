const express = require('express');

const productController = require('./controller');
const middleware = require('../../middleware/index');

const router = express.Router();

router
     /**
     * @api {get} http://localhost:8080/products/ Request All Products Infromation
     * @apiName GetProducts
     * @apiGroup Products
     * 
     * @apiSuccess {String} _id ID of the Product
     * @apiSuccess {String} namee Name of the User
     * @apiSuccess {String} about Info about Product
     * @apiSuccess {String} origin Origin Product
     * @apiSuccess {String} weight Product weight
     * @apiSuccess {String} user_id which user is owner this product 
     * 
     * @apiSuccessExample {json} Success
     *   HTTP/1.1 200 ok
     *   {  "about": "",
     *       "origin": "",
     *       "weight": 0,
     *       "_id": "5cb069a6737f552ba7acffe5",
     *       "name": "lalalpauuuupapp",
     *       "user_id": "5cb0668e5e8b142b89679078"
     *   },
     *   {  "about": "",
     *       "origin": "",
     *       "weight": 0,
     *       "_id": "5cb069a6737f552ba7xxffe5",
     *       "name": "tutu",
     *       "user_id": "5cb0668e5e8b142b89679088"
     *   }
     */
    .get('/' , productController.getAllProducts)

    
    .post('/', middleware.check, productController.createProduct)
    .get('/:id', productController.getOneProduct)
    .delete('/:id', middleware.check,productController.deleteProduct)
    .put('/:id', middleware.check, productController.updateProduct)

module.exports = router;