const express = require("express")

const {connection} = require("./configs/db")
  const {userRouter} = require("./routes/user.route")
  const {postRouter} = require("./routes/post.route")
  const {authenticate} = require("./middleware/authantication.middlware")

const app = express();
const cors = require("cors")
app.use(cors())
app.use(express.json())
require("dotenv").config()

app.use("/users",userRouter)
app.use(authenticate)
app.use("/posts",postRouter)


app.listen(process.env.port,async(req,res)=>{
    try
    {
       await connection
       console.log("connected to Database")
    } 
    catch(error)
    {
      console.log(error.message)
    }

    console.log(`server is runing at ${process.env.port}`)
})