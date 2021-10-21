const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const signIn = async(req,res) => {
    try{
        const body = req.body
        const user = await User.findOne({email:body.email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'No User Registered with this email'
            })
        }
        if(user.password != body.password){
            return res.status(404).send({
                success:false,
                message:'Incorrect Password'
            })
        }
        let token;
        if(user){
            token = jwt.sign({verified:true},process.env.SECRET)
        }
        return res.status(200).send({
            success:true,
            token:token
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = signIn