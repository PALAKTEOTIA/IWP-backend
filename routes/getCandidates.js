const Candidate = require('../models/candidate');

const getCandidate = async function(req,res){
    try{
        if(!req.verifyStatus || req.verifyStatus == false){
            return res.status(400).send({
                success:false,
                message:'Authentication Failed'
            })
        }
        const candidates = await Candidate.find({},{name:1,email:1,image:1,about:1,organizationName:1}).lean()
        if(!candidates){
            return res.status(401).send({
                success:false,
                message:'No Data to Show'
            })
        }
        res.status(200).send({
            success : true,
            candidates
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = getCandidate