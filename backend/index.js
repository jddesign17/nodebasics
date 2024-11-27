const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

const fakeData = [
    { name: "John Doe", age: 28, phone: "555-1234" },
    { name: "Jane Smith", age: 34, phone: "555-5678" },
    { name: "Michael Johnson", age: 41, phone: "555-8765" },
    { name: "Emily Davis", age: 25, phone: "555-4321" },
    { name: "David Wilson", age: 30, phone: "555-9876" }
  ];
  

app.get('/get',(req,res)=>{
    res.send(fakeData)
})


app.listen(3000,()=>{
    console.log("server started")
})

