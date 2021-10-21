const formidable = require('formidable');

const parserFn = async function(req,res,next){
    try{
        const form = formidable({ multiples: true });
 
        form.parse(req, (err, fields, files) => {
            if (err) {
            next(err);
            return;
            }
            req.body = {
                ...fields,
                ...files
            }
            req.file = {...files}
            console.log(req.body)
            next()
        });
    }catch(err){
        console.log(err)
    }
}

module.exports = parserFn