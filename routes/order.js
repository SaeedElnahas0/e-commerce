var express = require('express');
var router = express.Router();
const control = require('../controller/order_controll');
const checkAuth = require('../middleware/check-auth');

//add order
router.post('/addorder', checkAuth, control.addOrder);

//get order
router.get('/', checkAuth, control.getOrder);
//update order
router.patch('/:id', checkAuth, control.updataOrder);

//delete order
router.delete('/:id', checkAuth, control.deleteOrder);


module.exports = router;