import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link,useNavigate } from "react-router-dom";
import {useSelector} from 'react-redux'

const Header = () => {
  const {currentUser} = useSelector(state=>state.user)
  const[searchTerm,setSearchTerm] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e)=>{
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(()=>{
   const urlParams = new URLSearchParams(location.search)
   const searchTermFromUrl = urlParams.get('searchTerm')
   setSearchTerm(searchTermFromUrl)
  },[location.search])
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="flex flex-wrap text-sm sm:text-xl ">
            <span className="text-slate-500">Kalees</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            className="bg-transparent outline-none w-24 sm:w-64 "
            onChange={(e)=>setSearchTerm(e.target.value)}
          />
          <button type="submit">
          <IoSearch />
          </button>
        </form>
        <ul className="flex gap-4">
          <li className="hidden sm:inline hover:underline  text-slate-700">
            <Link to="/">Home</Link>
          </li>
          <li className="hidden sm:inline hover:underline text-slate-700">
            <Link to="/about">About</Link>
          </li>
          <li className="hover:underline text-slate-700">
            <Link to="/profile">
             {
                currentUser ? 
                <img src={currentUser.avatar} className="w-7 h-7 rounded-full" alt="profile" />
                :
                "Sign in"
             }
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
