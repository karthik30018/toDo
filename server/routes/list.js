const express = require('express')
const Router = express.Router()
const List = require('../models/list')

Router.post("/addTask",async (req,res)=>{
    try{
        const {title,body} = req.body;
        
        const list = new List({ title , body})
        await list.save().then(()=>res.status(200).json({list}))
    }catch(err){
        console.log(err)
    }
    
})

Router.put("/updateTask/:id",async (req,res)=>{
    try{
        const {title,body} = req.body;
        const list = await List.findByIdAndUpdate(req.params.id,{title,body})
        list.save().then(()=>res.status(200).json({message:"Updated"}))
    }catch(err){
        console.log(err)
    }
    
})

Router.delete("/deleteTask/:id",async (req,res)=>{
    try{
        await List.findByIdAndDelete(req.params.id).then(()=>res.status(200).json({message:"Deleted"}))
    }catch(err){
        console.log(err)
    }
    
})


Router.get("/displayAll",async(req,res)=>{
   List.find().then((data)=>{
    res.status(200).json(data)
   })
})

module.exports = Router;