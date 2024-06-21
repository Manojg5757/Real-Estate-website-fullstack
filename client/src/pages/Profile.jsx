import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePer, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
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
  return (
    <div className="max-w-xl mx-auto p-3">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>
      <form action="" className="flex flex-col gap-4">
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
        />
        <input
          type="email"
          className="p-3 border rounded-lg"
          id="email"
          placeholder="Email..."
        />
        <input
          type="text"
          className="p-3 border rounded-lg "
          id="password"
          placeholder="password..."
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg disabled:opacity-70 hover:opacity-90">
          UPDATE
        </button>
      </form>
      <div className="flex justify-between text-red-600 mt-2">
        <p className="cursor-pointer">Delete Account?</p>
        <p className="cursor-pointer">Sign Out</p>
      </div>
    </div>
  );
};

export default Profile;
