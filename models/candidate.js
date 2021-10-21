const mongoose = require('mongoose');
const candidateSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    organizationName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,
        minlength:10,
        unique:true
    },
    about:{
        type:String,
        required:true
    },
    voteCount:{
        type:Number,
        default:0
    },
    image:{
        type:String
    }
})

module.exports = mongoose.model('Candiadate',candidateSchema)