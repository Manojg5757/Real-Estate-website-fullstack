import React from "react";

const Search = () => {
  return (
    <div className="flex flex-col sm:flex-row">
      {/* listing filter section --left and right two sections */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <label className=" whitespace-nowrap font-semibold" >
              Search:
            </label>
            <input
              type="text"
              className="p-3 border rounded-lg w-full"
              id="searchTerm"
              placeholder="Search for..."
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">All</label>
            <div className="flex gap-2">
              <input type="checkbox" id="all" className="w-5" />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5" />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2">
            <label className="font-semibold">Aminities:</label>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5" />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" />
              <span>Furnished</span>
            </div>
          </div>
          <div>
            <label className="font-semibold">Sort</label>
            <select name="" id="sort_order" className="border rounded-lg p-3">
                <option value="">Price high to low</option>
                <option value="">Price low to high</option>
                <option value="">Latest</option>
                <option value="">Oldest</option>
            </select>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95">Search</button>
        </form>
      </div>
      {/* listing card */}
      <div>
        <h1 className="text-3xl text-slate-700 border-b p-3">Listings</h1>
      </div>
    </div>
  );
};

export default Search;
