const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const { Schema } = mongoose;

const productScheme = new Schema({
    name: {
        type: String,
        minlength: 2,
        maxlength: 20
    },
    about: {
        type: String,
        default: '',
        maxlength: 300
    },
    origin: {
        type:String,
        default:''
    },
    weight: {
        type:Number,
        default: 0
    },
    user_id: {
        type: Schema.ObjectId,
        ref: 'User',
      },
}, { 
    versionKey: false 
})

const product = mongoose.model('products', productScheme);

class Product {
    static get tableName() {
        return 'products';
    }

    getAllProducts() {
        return new Promise(async (resolve, reject) => {
            await product.find({}, (err, users) => {
                if (err) return reject(err);
                resolve(users);
            })
        });
    }

    createProduct(productData) {
        return new Promise(async (resolve, reject) => {
            await product.create(productData, (err, res) => {
                if (err) return reject(err);
                resolve(res);
            })
        });
    }
    deleteProductById(id){
        return new Promise(async (resolve, reject) => {
            await product.findByIdAndDelete(id, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        });
    }

    updateProduct(productData) {
        return new Promise(async (resolve, reject) => {
            await product.update(productData, (err, res) => {
                if (err) reject(err);
                resolve(res);
            })
        });
    }

    getOneProduct(id) {
        return new Promise(async (resolve, reject) => {
            await product.findOne({id}, (err, res) => {
                if(err) reject(err);
                resolve(res);
            })
        })
    }
}

module.exports = Product;