import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

const ListingItem = ({ listItems }) => {
  return (
    <div className="bg-white shadow-md transition-shadow hover:shadow-lg  overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listItems._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300 "
          src={listItems.imageUrls[0]}
          alt=""
        />
        <div className="flex flex-col gap-2 p-3 w-full">
          <p className="semibold truncate text-xl w-full">{listItems.name}</p>
          <div className="flex gap-1 items-center">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-700 truncate">
              {listItems.address}
            </p>
          </div>
          <p className="text-gray-600 line-clamp-2 text-sm">
            {listItems.description}
          </p>
          <p className="font-semibold text-slate-500 mt-2">
            $
            {listItems.offer
              ? listItems.discountedPrice.toLocaleString("en-US")
              : listItems.regularPrice.toLocaleString("en-US")}{" "}
            <span>{listItems.type === "rent" ? "/ Month" : ""}</span>
          </p>
          <div className="flex gap-4">
            <div className="font-bold text-xs">
              {
                listItems.bedRooms >1 ? `${listItems.bedRooms} beds` : `${listItems.bedRooms} bed`
              }
            </div>
            <div className="font-bold text-xs">
              {
                listItems.bathRooms >1 ? `${listItems.bathRooms} baths` : `${listItems.bathRooms} bath`
              }
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingItem;
