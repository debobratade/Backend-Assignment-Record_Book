const wonerModel = require("../models/wonerModel");

const {validName, isValidMail } = require("../validator/validator")


const jwt = require('jsonwebtoken')
const jwtkey = '@Rishi'


const nameRegx = /^[a-zA-z]+([\s][a-zA-Z]+)*$/;



const createWoner = async function (req, res) {
  try {
    let data = req.body;
    if (!data.name && !data.email && !data.password ) {
      return res.status(400).send({
        status:false,
        msg:"Please enter details for user registration." });
  }
   
  if (!validName(data.name)) {
    return res.status(400).send({ status: false, msg: `${data.name} is not a valid name.` })
}
if (!isValidMail(data.email)) {
  return res.status(400).send({ status: false, msg: "Please enter email for registration & should be valid one." })
}
if (!data.password) {
  return res.status(400).send({ status: false, msg: "Please enter password." })
}

    let woner = await wonerModel.create(data);
    woner=woner.toObject()
    delete woner.password


    jwt.sign({woner}, jwtkey, (err, token)=>{
      if(err){
        return res.status(500).send({msg: "Something went wrong" })  
      }
      return res.status(201).send({ woner, msg: "successfully created", auth:token})  

     })

  } catch (err) {
    res.status(500).send({ status: false, msg: err.msg });
  }
};


const loginWoner = async function (req, res) {
  let email = req.body.email;
  let password = req.body.password;

  if (!isValidMail(email)) {
    return res.status(400).send({ status: false, msg: "Please enter email for registration & should be valid one." })
  }
  if (!password) {
    return res.status(400).send({ status: false, msg: "Please enter password." })
  }

  let woner =await wonerModel.findOne({ email: email, password: password }).select("-password")
  if(woner){

     jwt.sign({woner}, jwtkey, (err, token)=>{
      if(err){
        return res.status(500).send({msg: "Something went wrong" })  
      }
      return res.status(200).send({woner, auth:token})  

     })

  }else{
    return res.send({msg: "No user found"})
  }
}









module.exports.createWoner = createWoner;
module.exports.loginWoner = loginWoner;
