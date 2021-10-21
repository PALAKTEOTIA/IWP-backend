require('dotenv').config()
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const signUp = async(req,res)=>{
    try{
        const body = req.body;
        let user = new User({
            ...body
        })
        await user.save()
        let token = jwt.sign({verified:true},process.env.SECRET)
        res.status(200).send({
            success : true,
            message : 'User Credentials Saved Successfully',
            token
        })
    }catch(err){
        console.log(err);
    }
}

module.exports = signUp
