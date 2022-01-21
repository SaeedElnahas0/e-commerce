const Products = require('../models/Product');


addProducts = function (req, res, next) {
    const product = new Products({
        productname: req.body.productname,
        price: req.body.price,
        more_info: req.body.more_info,
        image: req.file.path
    });
    product.save().
        then(resault => {
            if (resault) {
                res.status(200).json({
                    massage: 'Product Added Successfully',
                    resault: resault
                });
            } else {
                res.status(400).json({
                    massage: 'Product Add Failed'
                });
            }
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            });
        });
}

getProducts = function (req, res, next) {
    Products.find().
        select('_id productname price more_info').
        then(resault => {
            res.status(200).json({
                massage: resault
            });
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            });
        });
}

getoneProduct = function(req, res, next) {
    Products.find({ _id: req.params.id }).
        select('_id productname price more_info').
        then(resault => {
            res.status(200).json({
                massage: resault
            });
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            });
        });
}

updateProducts = function (req, res, next) {
    const newProduct = {
        productname: req.body.productname,
        price: req.body.price,
        more_info: req.body.more_info
    }
    Products.updateOne({ _id: req.params.id }, { $set: newProduct }).
        then(resault => {
            res.status(200).json({
                massage: 'Product updated Successfully',
                resault: resault
            });
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            });
        });
}

deleteProducts = function (req, res, next) {
    Products.deleteOne({ _id: req.params.id }).
        then(resault => {
            res.status(200).json({
                massage: 'Product deleted Successfully',
                resault: resault
            });
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            });
        });
}

module.exports = {
    addProducts: addProducts,
    getProducts: getProducts,
    getoneProduct: getoneProduct,
    updateProducts: updateProducts,
    deleteProducts: deleteProducts
}