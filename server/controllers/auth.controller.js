import userModel from "../model/user.model.js"
import bcryptjs from 'bcryptjs'
import { errorHandler } from "../utils/error.js"

export const signup = async(req,res,next)=>{
    const {username,email,password} = req.body
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new userModel({username,email,password:hashedPassword})
    try {
        await newUser.save()
    res.status(201).json("Created Successfully")
    } catch (error) {
        next(errorHandler(550,"Error happened what the fuck should I do"))
    }
}