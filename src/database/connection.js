
const mongoose = require("mongoose");


 async function connectDatabase(){
    try {
        await mongoose.connect("mongodb://localhost:27017/studentRegistration"); // Database name studentRegistration
        console.log("Connection successful...");
    } catch (err) {
        console.error("Connection error:", err);
    }
}

connectDatabase();