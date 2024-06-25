import React, { useState,useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import {useNavigate,useParams}from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
const UpdateListing = () => {
  
  const navigate = useNavigate()
  const { currentUser } = useSelector((state) => state.user);
  const [imageFiles, setImageFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    regularPrice: 50,
    discountedPrice: 0,
    bathRooms: 1,
    bedRooms: 1,
    type: "sale",
    parking: false,
    furnished: false,
    offer: false,
    userRef: currentUser._id,
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const {id} = useParams()
  useEffect(()=>{
     const fetchData = async()=>{
      try {
        const res = await axios.get('/api/listing/get/'+id)
        setFormData(res.data)
      } catch (error) {
        
      }
     }
     fetchData()
  },[])
console.log(formData)
  // getting image urls from firebase and adding it to formData
 
  const handleImageUpload = () => {
    if (
      imageFiles.length > 0 &&
      imageFiles.length + formData.imageUrls.length < 7
    ) {
      setImageUploading(true);
      const promises = [];

      for (let i = 0; i < imageFiles.length; i++) {
        promises.push(storeImage(imageFiles[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(null);
          setImageUploading(false);
        })
        .catch((err) => {
          setImageUploadError("Image upload failed");
          setImageUploading(false);
        });
    } else {
      setImageUploadError("Max Upload images 6 only");
    }
  };

  // saving images in firebase using promise because there are multiple asynchronous operations
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl);
          });
        }
      );
    });
  };

  // image deleting function

  const handleImageDelete = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  // updating form input

  const handleInputChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFormData({
        ...formData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "furnished" ||
      e.target.id === "parking" ||
      e.target.id === "offer"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  // form submit handler

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.imageUrls.length < 1)
        return setImageUploadError("You must upload One Image");
      if (Number(formData.discountedPrice) > Number(formData.regularPrice))
        return setImageUploadError(
          "Discounted Price must be lower than regular price"
        );
      setLoading(true);
      const res = await axios.post("/api/listing/update/" + id, formData);
      setLoading(false);
      console.log(res.data);
      navigate(`/listing/${id}`)
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-3">
      <h1 className=" my-7 text-3xl text-center">Update Lisitng</h1>
      <form className="flex flex-col sm:flex-row gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            minLength="10"
            max="62"
            required
            placeholder="Name..."
            id="name"
            className="p-3 rounded-lg w-[100%]"
            value={formData.name}
            onChange={handleInputChange}
          />
          <textarea
            type="text"
            required
            placeholder="Description..."
            id="description"
            className="p-3 rounded-lg w-[100%]"
            value={formData.description}
            onChange={handleInputChange}
          />
          <input
            type="text"
            required
            placeholder="Address..."
            id="address"
            className="p-3 rounded-lg w-[100%]"
            value={formData.address}
            onChange={handleInputChange}
          />
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleInputChange}
                checked={formData.type === "sale"}
                id="sale"
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleInputChange}
                checked={formData.type === "rent"}
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                onChange={handleInputChange}
                checked={formData.parking}
                id="parking"
                className="w-5"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                onChange={handleInputChange}
                checked={formData.furnished}
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                onChange={handleInputChange}
                checked={formData.offer}
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6 mt-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedRooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleInputChange}
                value={formData.bedRooms}
              />
              <p>Bedrooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathRooms"
                min="1"
                max="10"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleInputChange}
                value={formData.bathRooms}
              />
              <p>Bath Rooms</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max="1000000"
                required
                className="p-3 border border-gray-300 rounded-lg"
                onChange={handleInputChange}
                value={formData.regularPrice}
              />
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                {formData.type === "rent" ? (
                  <p className="text-xs">($/Month)</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            {formData.offer ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountedPrice"
                  min="1"
                  max="1000000"
                  required
                  className="p-3 border border-gray-300 rounded-lg"
                  onChange={handleInputChange}
                  value={formData.discountedPrice}
                />
                <div className="flex flex-col items-center">
                  <p>Offer Price</p>
                  {formData.type === "rent" ? (
                    <p className="text-xs">($/Month)</p>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ) : (
              ""
            )}
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
          <p>{imageUploadError ? imageUploadError : ""}</p>
          <button
            disabled={loading}
            className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 disabled:opacity-70"
            type="submit"
          >
            {loading ? "Updating List..." : "UPDATE"}
          </button>
          <div className="flex flex-col gap-4">
            {formData.imageUrls.length > 0 &&
              formData.imageUrls.map((item, index) => {
                return (
                  <div key={index} className="flex p-3 gap-4 justify-between">
                    <img
                      className="rounded-lg w-20 h-20 object-contain"
                      src={item}
                      alt=""
                    />
                    <button
                      type="button"
                      onClick={() => handleImageDelete(index)}
                      className="text-red-700"
                    >
                      DELETE
                    </button>
                  </div>
                );
              })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateListing;
