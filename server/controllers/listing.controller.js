import Listing from "../model/listing.model.js"


export const createListing = async(req,res,next)=>{
     try {
        const newListing = await Listing.create(req.body)
        console.log(newListing)
        return res.status(200).json(newListing)
     } catch (error) {
        next(error)
     }
}