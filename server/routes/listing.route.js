import express from 'express'
import { createListing,deleteListing,updateListing } from '../controllers/listing.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

export const listingRouter = express.Router()

listingRouter.post('/create', verifyUser,createListing)
listingRouter.delete('/delete/:id',verifyUser,deleteListing)
listingRouter.post('/update/:id',verifyUser,updateListing)