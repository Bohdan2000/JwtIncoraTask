const Product = require('../../models/product');
const constants = require('../../../constants/index');


const getAllProducts = async (req, res) => {
    const findAll = await new Product().getAllProducts();
    return res.status(constants.STATUS.Ok).json(findAll);
}

const createProduct = async (req, res) => {
    const userFromToken = req.user;
    if(constants.ALLOW_ROLES[1] === userFromToken.userData.role || constants.ALLOW_ROLES[2] === userFromToken.userData.role){
        const productData = req.body;
        productData.user_id = userFromToken.userData.id;
        const product = await new Product().createProduct(productData);
        return res.status(constants.STATUS.Ok).json(product);
    } else return res.status(constants.STATUS.NotAllowed).json(constants.BAD_ROLE);
}

const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const userFromToken = req.user;
    if(constants.ALLOW_ROLES[1] === userFromToken.userData.role || constants.ALLOW_ROLES[2] === userFromToken.userData.role){
        if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);
        const findDeleteProduct = await new Product().getOneProduct(id);

        if (findDeleteProduct.user_id === userFromToken.userData.id){
            if (findDeleteProduct){
                const deleteProduct = await new Product().deleteById(id);
                return res.status(constants.STATUS.Ok).json(deleteProduct); 
            }
            return res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND);
        }else return res.status(constants.STATUS.Forbidden).json(constants.NOT_ALLOW);
    } else return res.status(constants.STATUS.NotAllowed).json(constants.BAD_ROLE);

}

const getOneProduct= async (req, res) => {
    const id = req.params.id;
    if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);
    const findOne = await new Product().getOneProduct(id);
    if (findOne) return res.status(constants.STATUS.Ok).json(findOne); 
    return res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND);
    
}

const updateProduct = async (req, res) => {
    const productData = req.body;
    const id = req.params.id;
    const userFromToken = req.user;
    if(constants.ALLOW_ROLES[1] === userFromToken.userData.role || constants.ALLOW_ROLES[2] === userFromToken.userData.role){
        if (!id) return res.status(constants.STATUS.BadValidation).json(constants.BAD_REQUEST);
        const findUpdateProduct = await new Product().getOneProduct(id);

        if (findUpdateProduct.user_id === userFromToken.userData.id){
            if (findDeleteProduct){
                const updateProduct = await new Product().updateProduct(productData);
                return res.status(constants.STATUS.Ok).json(updateProduct); 
            }
            return res.status(constants.STATUS.NotFound).json(constants.NOT_FOUND);
        }else return res.status(constants.STATUS.Forbidden).json(constants.NOT_ALLOW);
    } else return res.status(constants.STATUS.NotAllowed).json(constants.BAD_ROLE);

}

module.exports = {
    getAllProducts,
    createProduct,
    getOneProduct,
    deleteProduct,
    updateProduct
}