import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link} from 'react-router-dom'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {updateSuccess,updateStart,updateFailure,deleteSuccess,deleteFailure,deleteStart,signoutStart,signoutSuccess,signoutFailure} from '../redux/user/userSlice.js'
import axios from "axios";

const Profile = () => {
  const { currentUser,loading,error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const[updateSuccessMessage,setUpdateSuccessMessage] = useState(false)
  const dispatch = useDispatch()
  console.log(filePer);
  console.log(fileUploadError);
  console.log(formData);
  const filRef = useRef();
  console.log(filePer);
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed", 
      (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFilePerc(Math.round(progress));
    },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      }
    )
  };

  const handleChange = (e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      dispatch(updateStart())
      const res = await axios.post(`/api/user/update/${currentUser._id}`,formData)
      console.log(res)
      if(res){
        dispatch(updateSuccess(res.data))
        setUpdateSuccessMessage(true)
      }else{
        dispatch(updateFailure(res.message))
      }
    } catch (error) {
      dispatch(updateFailure(error.response.data.message))
    }
  }

 const handleDelete = async()=>{
    try {
      dispatch(deleteStart())
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`)
      dispatch(deleteSuccess())
      console.log(res.data)
    } catch (error) {
     dispatch(deleteFailure(error.message))
    }
 }

 const handleSignout = async()=>{
  try {
    dispatch(signoutStart())
    const res = await axios.get('/api/auth/signout')
    dispatch(signoutSuccess())

  } catch (error) {
    dispatch(signoutFailure())
  }
 }

  return (
    <div className="max-w-xl mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          hidden
          ref={filRef}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <img
          src={formData.avatar || currentUser.avatar}
          onClick={() => filRef.current.click()}
          className="w-24 h-24 rounded-full cursor-pointer self-center object-cover"
          alt=""
        />
        <p className="text-sm self-center">
          {
            fileUploadError ? 
            <span className="text-red-700">Error in Image Upload(Image must be less than 2MB)</span>
            :
            filePer >0 && filePer < 100 ?
            <span className="text-slate-700">{`Uploading ${filePer}`}</span>
            :
            filePer === 100 ?
            <span className="text-green-700">Upload Complete</span>
            :
             ""
          }
        </p>
        <input
          type="text"
          className="p-3 border rounded-lg"
          id="username"
          placeholder="Username..."
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className="p-3 border rounded-lg"
          id="email"
          placeholder="Email..."
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="text"
          className="p-3 border rounded-lg "
          id="password"
          placeholder="password..."
          onChange={handleChange}
        />
        <button disabled={loading} className="bg-slate-700 text-white p-3 rounded-lg disabled:opacity-70 hover:opacity-90">
          {
            loading ? "Loading..." : "UPDATE"
          }
        </button>
        <button className="bg-green-700 rounded-lg p-3 hover:opacity-90"><Link to='/create-listing'>CREATE LISTING</Link></button>
      </form>
      <div className="flex justify-between text-red-600 mt-2">
        <p className="cursor-pointer" onClick={handleDelete}>Delete Account?</p>
        <p className="cursor-pointer" onClick={handleSignout}>Sign Out</p>
      </div>
      <p className="text-red-700 text-center">
        {error ? error : ''}
      </p>
      <p className="text-green-700 text-center">
        {updateSuccessMessage ? "Update Success" : ''}
      </p>
    </div>
  );
};

export default Profile;
