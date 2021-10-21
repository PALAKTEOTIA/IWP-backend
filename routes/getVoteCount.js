const Candidate = require('../models/candidate');

const getVoteCount = async(req,res)=> {
    try{
        if(!req.verifyStatus || req.verifyStatus == false){
            return res.status(404).send({
                success:false,
                message:'Authentication Failed'
            })
        }
        const votes = await Candidate.find({},{voteCount:1,name:1})
        res.status(200).send({
            success:true,
            message : votes
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = getVoteCount