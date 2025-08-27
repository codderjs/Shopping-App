
const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        require: true,
    },
    image: {
        type: String,
        required: true,
      },
    quantity:{
        type: Number,
        require: true
    },
    discount:{
        type: Number,
        require:false,
    },
    price: {
        type: Number,
        require: true
    },
    mrp: {
        type: Number,
        require:false,
    },
    
},

{ timestamps: true }

);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;