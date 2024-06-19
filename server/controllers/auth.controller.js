import userModel from "../model/user.model.js"
import bcryptjs from 'bcryptjs'

export const signup = async(req,res)=>{
    const {username,email,password} = req.body
    const hashedPassword = bcryptjs.hashSync(password,10)
    const newUser = new userModel({username,email,password:hashedPassword})
    try {
        await newUser.save()
    res.status(201).json("Created Successfully")
    } catch (error) {
        res.status(500).json(error.message)
    }
}