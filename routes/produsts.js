var express = require('express');
var router = express.Router();
const control = require('../controller/product_control');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

// لو دخلت صوره غلط مثلا 
const fileFilter = function(req, file, cb){
    if(file.mimetype === 'image/png'){
        cb(null, true);
    } else{
        cb(new Error('please upload jpeg file'), false);
    }
};
// علشان احول الصوره وتظهرلي طبيعيه
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './productImage/')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toDateString()+file.originalname) // بيحط التاريخ واسم الفايل ال فيه الصوره      
    }
});


const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: fileFilter,
});


//add product
router.post('/add', checkAuth, upload.single('myfile'), control.addProducts);
 
//get products
router.get('/', checkAuth, control.getProducts);

//get one product by Id
router.get('/:id', checkAuth, control.getoneProduct);

//update products
router.patch('/:id', checkAuth, control.updateProducts);

//delete products
router.delete('/:id', checkAuth, control.deleteProducts);

module.exports = router;