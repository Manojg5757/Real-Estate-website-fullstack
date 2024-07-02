import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ListingItem from "../components/ListingItem";

const Search = () => {
  const navigate = useNavigate();
  const [showmore, setShowmore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [inputs, setInputs] = useState({
    searchTerm: "",
    type: "all",
    rent: false,
    sale: false,
    offer: false,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });

  const handleChange = (e) => {
    const { id, value, checked } = e.target;
    if (id === "all" || id === "rent" || id === "sale") {
      setInputs({ ...inputs, type: id });
    }

    if (id === "searchTerm") {
      setInputs({ ...inputs, searchTerm: value });
    }
    if (id === "parking" || id === "furnished" || id === "offer") {
      setInputs({
        ...inputs,
        [id]: checked || checked === "true" ? true : false,
      });
    }
    if (id === "sort_order") {
      const sort = value.split("_")[0] || "createdAt";
      const order = value.split("_")[1] || "desc";
      setInputs({ ...inputs, sort, order });
    }
  };
  console.log(inputs);

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", inputs.searchTerm);
    urlParams.set("type", inputs.type);
    urlParams.set("parking", inputs.parking);
    urlParams.set("furnished", inputs.furnished);
    urlParams.set("offer", inputs.offer);
    urlParams.set("sort", inputs.sort);
    urlParams.set("order", inputs.order);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const typeFromUrl = urlParams.get("type");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const offerFromUrl = urlParams.get("offer");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setInputs({
        searchTerm: searchTermFromUrl || "",
        type: typeFromUrl || "all",
        offer: offerFromUrl === "true" ? true : false,
        parking: parkingFromUrl === "true" ? true : false,
        furnished: furnishedFromUrl === "true" ? true : false,
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
      });
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const searchQuery = urlParams.toString();
        const res = await axios.get(`/api/listing/get?${searchQuery}`);
        setLoading(false);
        setListings(res.data);
        if (res.data.length > 8) {
          setShowmore(true);
        } else {
          setShowmore(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [location.search]);
  console.log(listings);

  const handleShowmoreItems = async () => {
    try {
      const numberOfListings = listings.length;
      const startIndex = numberOfListings;
      const urlParams = new URLSearchParams(location.search);
      urlParams.set("startIndex", startIndex);
      const searchQuery = urlParams.toString();

      const res = await axios.get(`/api/listing/get?${searchQuery}`);
      const data = await res.data;
      if (data.length < 9) {
        setShowmore(false);
      }
      setListings(prevListings => [...prevListings, ...data]);;
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="flex flex-col sm:flex-row">
      {/* listing filter section --left and right two sections */}
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <label className=" whitespace-nowrap font-semibold">Search:</label>
            <input
              type="text"
              className="p-3 border rounded-lg w-full"
              id="searchTerm"
              value={inputs.searchTerm}
              onChange={handleChange}
              placeholder="Search for..."
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            <label className="font-semibold">All</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                checked={inputs.type === "all"}
                onChange={handleChange}
                className="w-5"
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                checked={inputs.type === "rent"}
                onChange={handleChange}
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                checked={inputs.type === "sale"}
                onChange={handleChange}
                className="w-5"
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                checked={inputs.offer}
                onChange={handleChange}
                className="w-5"
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2">
            <label className="font-semibold">Aminities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                checked={inputs.parking}
                onChange={handleChange}
                className="w-5"
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                checked={inputs.furnished}
                onChange={handleChange}
                className="w-5"
              />
              <span>Furnished</span>
            </div>
          </div>
          <div>
            <label className="font-semibold">Sort</label>
            <select
              name=""
              id="sort_order"
              onChange={handleChange}
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc">Price high to low</option>
              <option value="regularPrice_asc">Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">Oldest</option>
            </select>
          </div>
          <button className="p-3 bg-slate-700 text-white rounded-lg hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      {/* listing card */}
      <div className="flex-1">
        <div className="flex flex-wrap gap-4 p-7 ">
          {!loading && listings.length === 0 && (
            <p className="text-3xl mt-4 ml-4">No Listings Found</p>
          )}
          {loading && <p className="text-center ">Loading...</p>}
          {!loading &&
            listings &&
            listings.map((listItems) => {
              return <ListingItem key={listItems._id} listItems={listItems} />;
            })}
          {showmore && (
            <button 
               onClick={handleShowmoreItems} 
               className="text-green-500">
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
