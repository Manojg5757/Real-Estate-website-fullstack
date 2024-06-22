import React from "react";

const CreateListing = () => {
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
       
        <div className="flex flex-col flex-1 gap-4">
            <p className="font-semibold">Images: <span className="font-normal ml-2 text-gray-600">The First Image Will be Cover(max 6)</span></p>
            
          <div className="flex gap-4 " >
          <input type="file" accept="image/*" className="p-3 border border-gray-300 rounded w-full" multiple />
          <button className="text-green-700 border border-green-700 p-3 rounded-lg hover:shadow-lg disabled:opacity-70">Upload</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateListing;
