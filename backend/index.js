const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const app = express();

app.use(cors());
app.use(express.json())


mongoose.connect("mongodb+srv://surendar:1234@cluster0.rdcv1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
  console.log("Database Connected")
}).catch((err)=>{
  console.log(err)
})


const userSchema = new mongoose.Schema({
    username:String,
    age:Number
})


const userModel = mongoose.model("user",userSchema)

app.post("/create",async(req,res)=>{
  const {name,age} = req.body
  try {
    const user = await userModel.create({
      username:name,
      age:age
    })

    const userData = await user.save()

    res.send(userData)


  } catch (error) {
      res.send(error)
  }
})


app.get("/read",async(req,res)=>{
  try {

    const userData = await userModel.find()
    res.send(userData)
    
  } catch (error) {
      res.send(error)
  }
})


app.get("/user/:id",async(req,res)=>{
  try {
    const {id} = req.params
    const user = await userModel.findById(id)
    res.send(user)

  } catch (error) {
    res.send(error)
  }
})



app.put("/update/:id",async(req,res)=>{
  try {
    const {id} = req.params
    const {name,age} = req.body

    const user = await userModel.findById(id)

    if(!user)
    {
      res.send("user not found")
    }

    const userdata = await userModel.findByIdAndUpdate(id,{username:name,age:age},{new:true})
    res.send(userdata)
    
  } catch (error) {
    
  }
})

app.delete("/delete/:id",async(req,res)=>{
  try {
    const {id} = req.params

    const user = await userModel.findByIdAndDelete(id)
    if(!user)
    {
      res.send("user not found")
    }
    res.send("user deleted")
    
  } catch (error) {
    
  }
})

app.listen(3000, () => {
  console.log("server started");
});
