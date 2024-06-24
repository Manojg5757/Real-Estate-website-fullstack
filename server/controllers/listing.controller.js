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