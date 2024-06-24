import express from 'express'
import { deleteUser, test, updateUser, getListings } from '../controllers/user.controller.js'
import { verifyUser } from '../utils/verifyUser.js'


const userRouter = express.Router()

userRouter.get('/test',test)
userRouter.post('/update/:id', verifyUser,updateUser)
userRouter.delete('/delete/:id',verifyUser,deleteUser)
userRouter.get('/listing/:id',verifyUser,getListings)

export default userRouter