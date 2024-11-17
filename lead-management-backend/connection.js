const mongoose = require("mongoose")
const mongoDBConnection = async () =>{
try{
  await mongoose.connect(process.env.MONGODB_URL,{useNewUrlParser:true,useUnifiedTopology: true})
  console.log("mongoDB is Connected")
}catch(error){
     console.log("connetion error:",error)
     process.exit(1)
}
}

module.exports = mongoDBConnection;