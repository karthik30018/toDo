const express = require('express')
const Router = express.Router()
const User = require('../models/user')
const bcrypt = require("bcryptjs")

Router.post("/register",async (req,res)=>{
    try{
     const {email,username,password} = req.body;
     const hashPassword = bcrypt.hashSync(password);
     const user = new User({email,username,password: hashPassword})
     await user.save().then(()=>
        res.status(200).json({message:"Sign Up Successfull!!"})
     )
    }catch(err){
        // console.log(err)
        res.status(200).json({message:"User Already Exists"})
    }
}) 


Router.post("/signin",async(req,res)=>{
    try{
       const user = await User.findOne({email:req.body.email}) 
       if(!user){
        res.status(200).json({message:"User Not Exists"})
       }
       const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password)
       if(!isPasswordCorrect){
        res.status(200).json({message:"Password is Incorrect"})
       }
       const {password,...other} = user._doc;
       res.status(200).json({...other})
    }catch(err){

    }
})

        


module.exports = Router