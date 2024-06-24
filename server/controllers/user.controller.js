import Listing from "../model/listing.model.js";
import userModel from "../model/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const test = (req, res) => {
  res.json({ message: "The Dark Days are coming" });
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Only Update Your Account"));
  }

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async(req,res,next)=>{
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "Only Update Your Account"));
  }
  try {
    await userModel.findByIdAndDelete(req.params.id,{new:true})
    res.status(200).json({message:"user has been Deleted"})
  } catch (error) {
    next(error)
  }
}

export const getListings = async(req,res,next)=>{
  console.log(req.body)
  if(req.user.id === req.params.id){
    try {
      const listings = await Listing.find({userRef:req.params.id})
      res.status(200).json(listings)
    } catch (error) {
      next(error)
    }
  }else{
     return next(errorHandler(401,"You can view your listings only"))
  }
}

