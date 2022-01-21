const mongoose = require('mongoose');
const productsSchema = mongoose.Schema({
    productname: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    more_info: {
        type: String,
        required: true
    },
    image: {
        type: String,
    }
});

module.exports = mongoose.model('Products', productsSchema);