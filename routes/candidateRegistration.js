const Candidate = require('../models/candidate');

const candidateRegistration = async(req,res) => {
    try{
        if(!req.verifyStatus || req.verifyStatus == false){
            return res.status(404).send({
                success:false,
                message:'Authentication Failed'
            })
        }
        const body = req.body
        console.log('File'+req.file)
        var candidate = new Candidate({
            ...body,
            image:req.file.location
        });
        await candidate.save();
        res.status(200).send({
            success : true,
            message : 'Candidate Registration Completed'
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = candidateRegistration