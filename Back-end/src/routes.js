const express=require('express')
const router = express.Router()
const wonerController= require("./Controllers/wonerController")

const studentController = require('./Controllers/studentController')
const middleware = require('./Middleware/middleware')



router.post("/register",wonerController.createWoner)
router.post("/loginWoner",wonerController.loginWoner)

router.post("/addStudent", middleware.verify_token, studentController.studentAdd)
router.get("/getStudent/", middleware.verify_token,  studentController.studentGet)

router.get("/getStudent/:id", middleware.verify_token,  studentController.getStudentById)
router.put("/updateStudent/:id", middleware.verify_token,  studentController.updateStudentById)
router.delete("/deleteStudent/:id", middleware.verify_token,  studentController.deleteStudent)
router.get("/studentSearch/:key", middleware.verify_token, studentController.studentSearch)














module.exports= router;