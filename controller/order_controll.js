const Order = require('../models/Order');

addOrder = function (req, res, next) {
    const order = new Order({
        user: req.body.user,
        product: req.body.product
    });
    order.save().
        then(resault => {
            res.status(200).json({
                mss: 'Order Added Successfully',
                massage: resault
            });
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            });
        });
}

getOrder = function (req, res, next) {
    Order.find().
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

updataOrder = function (req, res, next) {
    var newProduct = req.body.product;
    Order.find({ _id: req.params.id }).
        then(resault => {
            var oldProduct = resault[0].product;
            for (var indexOfnewProduct = 0; indexOfnewProduct < newProduct.length; indexOfnewProduct++) {
                for (var indexOfoldProduct = 0; indexOfoldProduct < oldProduct.length; indexOfoldProduct++) {
                    if (newProduct[indexOfnewProduct]._id === oldProduct[indexOfoldProduct]._id) {
                        oldProduct[indexOfoldProduct].Qantity = Number(oldProduct[indexOfoldProduct].Qantity) + Number(newProduct[indexOfnewProduct].Qantity);
                        newProduct.splice(indexOfnewProduct, 1);
                        break;
                    }
                }
            }
            oldProduct = oldProduct.concat(newProduct);
            console.log(oldProduct);
            const newOrder = {
                product: oldProduct
            }

            Order.updateOne({ _id: req.body.orderID }, { $set: newOrder }).
                then(doc => {
                    res.status(200).json({
                        massage: doc
                    });
                }).
                catch(err => {
                    res.status(404).json({
                        massage: err
                    });
                });
        }).
        catch(err => {
            res.status(404).json({
                massage: err
            });
        });
}

deleteOrder = function (req, res, next) {
    Order.deleteOne({ _id: req.params.id }).
        then(resault => {
            res.status(200).json({
                massage: 'Order deleted Successfully',
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
    addOrder: addOrder,
    getOrder: getOrder,
    updataOrder: updataOrder,
    deleteOrder: deleteOrder
}