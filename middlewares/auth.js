require('dotenv').config();
const jwt = require('jsonwebtoken');

const authVerification = async function(req,res,next){
    try{
        if(!req.headers.authorization){
            return res.status(404).send({
                success:false,
                message:'No token Provided'
            })
        }
        const verify = jwt.verify(req.headers.authorization,process.env.SECRET)
        if(!verify || !verify.verified){
            return res.status(404).send({
                success:false,
                message:'Authentication Failed'
            })
        }
        req.verifyStatus = true
        next()
    }catch(err){
        console.log(err)
    }
}

module.exports = authVerification