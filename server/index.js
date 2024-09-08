const express = require('express')
const app = express()
const PORT =8000;
const connectToMongoDb = require('./connection')
const list = require("./routes/list")
const auth = require("./routes/auth")
const URL = "mongodb://127.0.0.1:27017/todo"
const cors = require("cors");

connectToMongoDb(URL).then(()=>{
        console.log("Connected")
    }).catch((err)=>{
    console.log("Db not connected")
})
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Hey!!")
})


app.use(cors());
    
app.use("/api/r1",list);
app.use("/api/r2",auth);
app.listen(PORT,() => {
    console.log(`http://localhost:${PORT}`)
})