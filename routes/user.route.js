const express = require("express")
const {userModel} = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcyrpt = require("bcrypt")
const userRouter = express.Router()
const app = express();
app.use(express.json())

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city} = req.body
    try
    {
       bcyrpt.hash(password,3,async(err,hash)=>{
        if(err){
            res.send({msg:"something went wrong",error:error.message})  
        }else{
            const User = new userModel({name,email,gender,password:hash,age,city})
            await User.save()
            res.send({msg:"user Registered successfully"})
        }
       })
    } 
    catch(error)
    {
      res.send({msg:"something went wrong",error:error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try
    {
       const user = await userModel.find({email})
        if(user.length>0){
            bcyrpt.compare(password,user[0].password,(err,result)=>{
                if(result){
                    const token = jwt.sign({email,userid:user[0]._id},"masai")
                    res.send({msg:"logged in",Token:token})
                   
                }else{
                    res.send({msg:"wrong creadinals"})
                }
            })
        }
       
    } 
    catch(error)
    {
        res.send({msg:"something went wrong",error:error.message})
    }
})

module.exports = {userRouter}
