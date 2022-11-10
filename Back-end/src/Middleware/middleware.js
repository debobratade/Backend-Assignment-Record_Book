
const jwt = require('jsonwebtoken')
const jwtkey = '@Rishi'

function verify_token(req, res, next){
    let token = req.headers['authorization']
     
    if(token){
       
        let decodedToken = jwt.verify(token, jwtkey)
        //  console.log(decodedToken);
       
        jwt.verify(token, jwtkey, (err, valid)=>{
         
            if(err){
                return res.status(401).send({msg: "Error in token"})
            }else{
                req.userIdnew = decodedToken.woner._id
                next()
            }
        })
    }else{
        return res.status(400).send({msg: "Add token"})
    }
}

module.exports.verify_token=verify_token