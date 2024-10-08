const mongoose=require('mongoose')
const {model}=require("./schema")
const express=require("express")
const cors=require("cors")
const app=express()
const {user} =require("./user")

app.use(express.json())
app.use(cors())
const mongooseConnect=async ()=>{
    try{
      await mongoose.connect("mongodb+srv://pssm9025528322:9025528322@cluster0.altz4n8.mongodb.net/user?retryWrites=true&w=majority&appName=Cluster0")
      console.log("Db connected")
    }
    catch(err){
      console.log(err)
    }
    }
    app.post("/post", async (req, res) => {
      const date = new Date();
      const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
      let hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      let formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
      formattedTime=`${formattedDate} ${formattedTime}`
      const { name, registerNo, gender, graduate, hsc, myambition, dept, dob } = req.body;
      const response = new model({ name, registerNo, gender, graduate, hsc, myambition, dept, dob, date: formattedTime });
  
      const a = await response.save();
      res.json({ id: a._id, message: 'Data saved successfully',a});
  });
  
  
  
  
app.get("/get",async(req,res)=>{
    const response=await model.find({})
    res.json({response})
})

app.post("/score",async(req,res)=>{
    const {title,score}=req.body
    const response=new scoremodel({title,score})
    await response.save()
    res.send("score saved")
})
app.put("/update/:id",async(req,res)=>{
    const id=req.params.id
    const {arr}=req.body
    console.log(id)
    console.log(arr)
    const response=await model.updateOne({_id:id},{arr:arr})
    res.send("updated")
})
app.post('/register', async (req, res) => {
  const { username, password, role } = req.body;
  try {
    const response = new user({ username, password, role });
    await response.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await user.findOne({username});
    console.log(response)
    if(response){
      if (response.password==password){
          res.send(response)
       
      }
      else{res.json({ message: 'password incorrect'});}
    }
    else{res.json({ message: 'user not fount' });}
    
    // res.send(response)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(5000|| process.env.PORT,()=>console.log("Port connected"))
 
 mongooseConnect()