const express = require("express")
const {postModel} = require("../model/post.model")
const jwt = require("jsonwebtoken")
const bcyrpt = require("bcrypt")
const postRouter = express.Router()
const app = express();
app.use(express.json())

postRouter.get("/",async(req,res)=>{
    const token = req.headers.authorization
    if(token){
        jwt.verify(token,"masai",async(err,decoded)=>{
            if(decoded){
                const post = await postModel.find({author:decoded.userid})
                res.send(post)
            }else{
                res.send({msg:"wrong token"})
            }
        })
    }else{
        res.send("please login first")
    }
})

postRouter.post("/create",async(req,res)=>{
    try
    {
        const post = req.body
        const new_post = new postModel(post)
        await new_post.save()
        res.send({msg:"new post created"})
    } 
    catch(error)
    {
        res.send({msg:"something went wrong",error:error.message})
    }
})

postRouter.patch("/update/:id",async(req,res)=>{
    try
    {
       const id = req.params.id
       const payload = req.body
       await postModel.findByIdAndUpdate(id,payload)
       res.send({msg:`post with id ${id} has been updates`})
    } catch(error)
    {
        res.send({msg:"something went wrong",error:error.message})
    }
})

postRouter.delete("/delete/:id",async(req,res)=>{
    try
    {
       const id = req.params.id
       
       await postModel.findByIdAndDelete({_id:id})
       res.send({msg:`post with id ${id} has been deleted`})
    } catch(error)
    {
        res.send({msg:"something went wrong",error:error.message})
    }
})
module.exports = {postRouter}