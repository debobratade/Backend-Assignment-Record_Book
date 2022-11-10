const mongoose = require('mongoose')

const ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({

    userId:{
        type: ObjectId,
        ref:"Woner",
       
    },
    name:{
        type: String,
      
    },
    subject:{
        type: String,
        
    },
    marks: {
        type:String,
        
    },
    
}, { timestamps: true});

module.exports = mongoose.model("student", studentSchema)
