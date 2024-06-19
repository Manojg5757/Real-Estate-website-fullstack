import React from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="flex flex-wrap text-sm sm:text-xl ">
            <span className="text-slate-500">Kalees</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-2 rounded-lg flex items-center">
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none w-24 sm:w-64 "
          />
          <IoSearch />
        </form>
        <ul className="flex gap-4">
          <li className="hidden sm:inline hover:underline  text-slate-700">
            <Link to="/">Menu</Link>
          </li>
          <li className="hidden sm:inline hover:underline text-slate-700">
            <Link to="/signout">SignOut</Link>
          </li>
          <li className="hover:underline text-slate-700">
            <Link to="/signin">Signin</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
