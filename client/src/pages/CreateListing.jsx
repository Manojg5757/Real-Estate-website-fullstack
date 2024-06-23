import React, { useState } from "react";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { app } from "../firebase";
const CreateListing = () => {
  const [imageFiles, setImageFiles] = useState([]);
  const[formData,setFormData] = useState({
    imageUrls:[],
  })
  const[imageUploadError,setImageUploadError] = useState(false)
  const[imageUploading,setImageUploading] = useState(false)
console.log(formData)
  const handleImageUpload = () => {
    if (imageFiles.length > 0 && imageFiles.length + formData.imageUrls.length < 7) {
      setImageUploading(true)
      const promises = [];

      for (let i = 0; i < imageFiles.length; i++) {
        promises.push(storeImage(imageFiles[i]));
      }
      Promise.all(promises).then((urls)=>{
        setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)})
        setImageUploadError(null)
        setImageUploading(false)
      }).catch(err=>{
        setImageUploadError("Image upload failed")
        setImageUploading(false)
      })
    }else{
      setImageUploadError("Max Upload images 6 only")
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) *100
          console.log(progress)
        },
        (error)=>{
          reject(error)
        },
        ()=>{
           getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            resolve(downloadUrl)
           })
        }
      );
    });
  };

  console.log(imageFiles);

  const handleImageDelete = (index)=>{
     setFormData({
      ...formData,
      imageUrls:formData.imageUrls.filter((_,i)=> i !== index)
     })
  }
  return (
    <div className="max-w-4xl mx-auto p-3">
      <h1 className=" my-7 text-3xl text-center">Create Lisitng</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            minLength="10"
            max="62"
            required
            placeholder="Name..."
            id="name"
            className="p-3 rounded-lg w-[100%]"
          />
          <textarea
            type="text"
            required
            placeholder="Description..."
            id="description"
            className="p-3 rounded-lg w-[100%]"
          />
          <input
            type="text"
            required
            placeholder="Address..."
            id="address"
            className="p-3 rounded-lg w-[100%]"
          />
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5" />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <p>Bath Rooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularprice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <p className="text-xs">($/Month)</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="offerprice"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
              />
              <div className="flex flex-col items-center">
                <p>Offer Price</p>
                <p className="text-xs">($/Month)</p>
              </div>
            </div>
          </div>
        </div>
{/* image upload sections */}
        <div className="flex flex-col flex-1 gap-4">
          <p className="font-semibold">
            Images:{" "}
            <span className="font-normal ml-2 text-gray-600">
              The First Image Will be Cover(max 6)
            </span>
          </p>

          <div className="flex gap-4 ">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFiles(e.target.files)}
              className="p-3 border border-gray-300 rounded w-full"
              multiple
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="text-green-700 border border-green-700 p-3 rounded-lg hover:shadow-lg disabled:opacity-70"
            >
              {imageUploading ? "Uploading..." : "UPLOAD"}
            </button>
          </div>
          <p>
            {
              imageUploadError ? imageUploadError : ""
            }
          </p>
          <div className="flex flex-col gap-4">
            {
              formData.imageUrls.length > 0 && formData.imageUrls.map((item,index)=>{
                return(
                  <div key={index} className="flex p-3 gap-4 justify-between">
                    <img className="rounded-lg w-20 h-20 object-contain"  src={item} alt="" />
                    <button type="button" onClick={()=>handleImageDelete(index)} className="text-red-700">DELETE</button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
