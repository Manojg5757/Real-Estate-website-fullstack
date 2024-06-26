import express from 'express'
import { createListing,deleteListing,updateListing,getListings,listingPage,getAllListings } from '../controllers/listing.controller.js'
import { verifyUser } from '../utils/verifyUser.js'

export const listingRouter = express.Router()

listingRouter.post('/create', verifyUser,createListing)
listingRouter.delete('/delete/:id',verifyUser,deleteListing)
listingRouter.post('/update/:id',verifyUser,updateListing)
listingRouter.get('/get/:id',getListings)
listingRouter.get('/listingpage/:id',listingPage)
listingRouter.get('/get',getAllListings)