
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        uppercase:true,
        required:true,
        trim:true,
        minLength:2,
    },
    email:{
        type:String,
        required: true,
        lowercase: true,
        unique:true,
        // validate is a function field.
        validate(value){
            //using validator.
            if(!validator.isEmail(value)){
                throw new Error("<script>alert('Invalid Email...'); window.location.href='/customerdetail';</script>");
            }
        }
    },
    address:{
        type:String,
        required:true,
        trim:true,
        minLength:2,
    },
    mobile:{
        type: String,
        required: true,
        unique:true,
        validate(value) {
            if (!validator.isMobilePhone(value, 'any')) {
                throw new Error("<script>alert('Invalid mobile number'); window.location.href='/customerdetail';</script>");
            }
        }
    },
    dob: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female', 'other'],
    },
    pin: {
        type: String,
        required: true,
        minLength: 4,
        maxlength: 8,
        validate(value) {
            if (!/^[0-9]{4,8}$/.test(value))  {
                throw new Error("<script>alert('PIN must contain only numeric characters and be between 4 and 6 digits long'); window.location.href='/customerdetail';</script>");
            }
        }
    }
    
});

// Hash the pin before saving to the database
// customerSchema.pre('save', async function(next) {
//     if (this.isModified('pin')) {
//         this.pin = await bcrypt.hash(this.pin, 10);
//     }
//     next();
// });


const Customerdetail = new mongoose.model('Customerdetail', customerSchema);

module.exports = Customerdetail;