

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const employeeSchema = new mongoose.Schema({
    firstname:{
        type:String,
        uppercase:true,
        required:true,
        trim:true,
        minLength:2,
    },
    lastname:{
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
                throw new Error("Invalid Email...");
            }
        }
    },
    password:{
        type:String,
        required:true,
        minLength:5,
    },
    // confirmPassword:{
    //     type:String,
    //     required:true,
    // }
        
});
// Using Hashing.
// app.js (POST, signUp = save())
// Before the data is saved to the database. called pre() method.
//employeeSchema.pre("save", async function(next) {
    
    // if(this.isModified("password")){
    //     //console.log(`The current password is ${this.password}`);
    //     this.password = await bcrypt.hash(this.password, 10);
    //     //console.log(`The current password is ${this.password}`);

    //     this.confirmPassword = undefined; 
    // }

    // The next() method is used to execute the save function after the pre() function.
   // next();
 //});


// Create a collection in mongoDB Database.
const Register = new mongoose.model("Register", employeeSchema);

module.exports = Register;