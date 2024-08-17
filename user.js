const mongoose=require("mongoose")

const schema=new mongoose.Schema({
    
    role:{
        type:String,
    },
    username:{
        type:String,
    },
    password:{
        type:String,
    } 
})
const user=mongoose.model("usrename",schema)

module.exports={user}