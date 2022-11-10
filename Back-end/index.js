const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const route = require('./src/routes');
const app = express()
app.use(express.json());
app.use(cors())




mongoose.connect("mongodb+srv://portfolio:Abc1234@cluster0.i4zs5y5.mongodb.net/Student-assignment?retryWrites=true&w=majority", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )

app.use('/', route);


app.listen(process.env.PORT || 5000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 5000))
});

