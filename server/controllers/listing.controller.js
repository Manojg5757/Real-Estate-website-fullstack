import Listing from "../model/listing.model.js"
import { errorHandler } from "../utils/error.js"


export const createListing = async(req,res,next)=>{
     try {
        const newListing = await Listing.create(req.body)
        console.log(newListing)
        return res.status(200).json(newListing)
     } catch (error) {
        next(error)
     }
}

export const deleteListing = async(req,res,next)=>{
  const listing = await Listing.findById(req.params.id)
  try {
  if(!listing){
   return next(errorHandler(404,"Listing Not Found"))
  }
  if( req.user.id !== listing.userRef){
   return next(errorHandler(401,"You can delete yours not others"))
  }

  
   await Listing.findByIdAndDelete(req.params.id)
   res.status(200).json("Deleted SuccessFully")
  } catch (error) {
   next(error)
  }
 }

 export const updateListing = async(req,res,next)=>{
   const listing = await Listing.findById(req.params.id)
   console.log(req.params.id)
   console.log(listing)
   try {
      if(!listing){
         return next(errorHandler(404,"listing not found"))
      }
      if(req.user.id !== listing.userRef){
         return next(errorHandler(401,"User Not Found"))
      }

      const updatedListing = await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
      res.status(200).json(updatedListing)
   } catch (error) {
      next(error)
   }
 }

 export const getListings = async(req,res,next)=>{
   const{id} = req.params
   try {
     const listing =  await Listing.findById(id)
     res.status(200).json(listing)
   } catch (error) {
      next(error)
   }
 }

 export const listingPage = async(req,res,next)=>{
   const {id} = req.params
   try {
      const listing = await Listing.findById(id)
      res.status(200).json(listing)
   } catch (error) {
      next(error)
   }
 }

 export const getAllListings = async(req,res,next)=>{
      try {
         const limit = parseInt(req.query.limit) || 9
         const startIndex = parseInt(req.query.satrtIndex) || 0
         let offer = req.query.offer
         let furnished = req.query.furnished
         let parking = req.query.parking
         let type = req.query.type

         if( offer === undefined || offer === 'false'){
            offer = {$in:[false,true]}
         }
         if( furnished === undefined || furnished === 'false'){
            furnished = {$in:[false,true]}
         }
         if( parking === undefined || parking === 'false'){
            parking = {$in:[false,true]}
         }
         if( type === undefined || type === 'all'){
            type = {$in:['sale','rent']}
         }
 
         const searchTerm = req.query.searchTerm || ''
         const sort = req.query.sort || 'createdAt'
         const order = req.query.order || 'desc'
          

         const listings = await Listing.find({
            name:{$regex:searchTerm,$options:'i'},
            offer,
            type,
            furnished,
            parking,
         }).sort({[sort]:order}).limit(limit).skip(startIndex)

         res.status(200).json(listings)

      } catch (error) {
         next(error)
      }
 }