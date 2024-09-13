const express = require('express')
const Router = express.Router()
const List = require('../models/list')
const User = require('../models/user')

Router.post("/addTask",async (req,res)=>{
    try{
        const {title,body,id} = req.body;
        const existingUser = await User.findById(id)
        if(existingUser){
            const list = new List({ title , body, user:existingUser})
            await list.save().then(()=>res.status(200).json({list}))
            existingUser.list.push(list)
            existingUser.save()
        }else{
            res.status(400).json({message: "User does not exist"})
        }
        
    }catch(err){ 
        console.log(err)
    }
    
})

Router.put("/updateTask/:id",async (req,res)=>{
    try{
        // const {title,body,email} = req.body;
        // const existingUser = await User.findOne({email})
            const {title,body} = req.body;
            const list =  await List.findByIdAndUpdate(req.params.id,{title,body})
            list.save().then(()=>res.status(200).json({message:"Updated"}))
        
    }catch(err){
        console.log(err)
    }
    
})

Router.delete("/deleteTask/:id",async (req,res)=>{
    try{
        const {id} = req.body;
        const existingUser = await User.findByIdAndUpdate(id,{$pull:{list:req.params.id}})
        if(existingUser){
            await List.findByIdAndDelete(req.params.id).then(()=>res.status(200).json({message:"Deleted"}))
        }
       
    }catch(err){
        console.log(err)
    }
    
})


Router.get("/getTask/:id",async(req,res)=>{
    try{
        const list = await List.find({user:req.params.id}).sort({createdAt: -1})
        
        if(list.length !== 0){
            res.status(200).json({list})
        }else{
            res.status(200).json({message:"No task created!"})
        }
    }catch(err){
        console.log(err)
    }
  
   
})

module.exports = Router;