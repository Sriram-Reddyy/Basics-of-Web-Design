const mongoose = require("mongoose");
const mongoDBURL = 'mongodb://localhost:27017/myDatabas';
mongoose.connect(mongoDBURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(()=>{
    console.log("Connected to MongoDB Successfully");
    const userSchema = new mongoose.Schema({
        id : Number
    })
    const userModel = new mongoose.model('user',userSchema);
  }).catch((err)=>{
    console.log("Error Connecting to database");
    console.log(err);
    process.exit(1);
  })