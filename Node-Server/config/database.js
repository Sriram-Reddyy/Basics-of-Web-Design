const mongoose = require("mongoose");
const mongoDBURL = 'mongodb://localhost:27017/myDatabase';
function connect(){
    mongoose.connect(mongoDBURL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(()=>{
        console.log("Connected to MongoDB Successfully");
      }).catch((err)=>{
        console.log("Error Connecting to database");
        console.log(err);
        process.exit(1);
      })
    return mongoose;
}
module.exports.connect = connect;