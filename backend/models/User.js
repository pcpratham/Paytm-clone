const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        minLength:3,
        maxLength:50,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }
});

module.exports = mongoose.model("User",userSchema);