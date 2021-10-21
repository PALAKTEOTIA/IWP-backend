const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:8,
        required:true
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        maxlength:10,
        unique:true
    }
})

module.exports = mongoose.model('User',userSchema)