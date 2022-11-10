
const studentModel = require("../models/studentModel");

const {validName, isValidMail } = require("../validator/validator")




const studentAdd = async function (req, res) {
    try {
      let data = req.body;
  
     let {name, subject}= data
     let obj={}

     if (!name && !subject && !data.marks) {
      return res.status(400).send({
        status:false,
        msg:"Please enter details " });
  }
     if (!name || !subject || !data.marks) {
      return res.status(400).send({
        status:false,
        msg:"Please enter all details " });
  }
   
  if (!validName(name)) {
    return res.status(400).send({ status: false, msg: `${name} is not a valid name.` })
}

     let student =await studentModel.findOne({name:name, subject:subject})

     if(student){
          obj={
            name:name,
            subject:subject,
            marks:(parseInt(student.marks)+ parseInt(data.marks))
          }

          let del =await studentModel.updateOne({_id:student.id}, {$set:obj}, { new: true })
     
          return res
          .status(200)
          .send({ status: true, msg: "successfully created", data: del });
        }else{

     


      let saveData = await studentModel.create(data);


      return res
        .status(201)
        .send({ status: true, msg: "successfully created", data: saveData });
     }
    } catch (err) {
        console.log(err.message);
      res.status(500).send({ status: false, msg: err.message });
    }
  };



  const studentGet = async function (req, res) {

    const id = req.userIdnew
    
    console.log(id);
    
    let products =await studentModel.find({userId:id})
    // console.log(products);

    if(products.length>0){
     return res
       .status(200)
       .send( products );
    }else{
     res.status(404).send({ status: false, msg: "No product found" });
    }
 
 }


 const getStudentById=async function (req, res) {
  const id = req.params.id

   let del =await studentModel.findOne({_id:id})
   if(del){
    return res
      .status(200)
      .send( del );
   }else{
    res.status(404).send({ status: false, msg: "No product found" });
   }

}


 const updateStudentById=async function (req, res) {
  const id = req.params.id
  let data = req.body
  data=data.toObject()



   let del =await studentModel.updateOne({_id:id}, {$set:data}, { new: true })
   if(del){
    return res
      .status(200)
      .send( del );
   }else{
    res.status(404).send({ status: false, msg: "No product found" });
   }

}


const deleteStudent = async function (req, res) {
  const id = req.params.id

   let del =await studentModel.deleteOne({_id:id})
   if(del){
    return res
      .status(200)
      .send( del );
   }else{
    res.status(404).send({ status: false, msg: "No product found" });
   }

}

const studentSearch = async function (req, res) {
  const id = req.userIdnew

  let products =await studentModel.find({
   "$or":[
     {name:{$regex:req.params.key}},
     {subject:{$regex:req.params.key}},
     {marks:{$regex:req.params.key}},
   ], "$and":[{userId:id}]
 })

  if(products){
   return res
     .status(200)
     .send( products );
  }else{
   res.status(404).send({ status: false, msg: "No product found" });
  }

}






  module.exports.studentAdd=studentAdd
  module.exports.studentGet=studentGet
  module.exports.getStudentById=getStudentById
  module.exports.updateStudentById=updateStudentById
  module.exports.deleteStudent=deleteStudent
  module.exports.studentSearch=studentSearch
