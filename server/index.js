import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'


const app = express()

app.use(express.json())
app.use(cors())



const port = 3000

app.get('/',(req,res)=>{
    res.json({message:"Manoj"})
})

app.listen(port,()=>{
    console.log("Connected to server")
})

