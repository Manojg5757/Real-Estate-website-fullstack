import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListings, setOfferListings] = useState([]);
  const [saleListings, setSaleListings] = useState([]);
  const [rentListings, setRentListings] = useState([]);
  SwiperCore.use([Navigation]);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const res = await axios.get("/api/listing/get?offer=true&limit=4");
        setOfferListings(res.data);
        fetchSale();
      } catch (error) {
        console.log(error);
      }
    };

    fetchOffer();

    const fetchSale = async () => {
      try {
        const res = await axios.get("/api/listing/get?type=sale&limit=4");
        setSaleListings(res.data);
        fetchRent();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRent = async () => {
      try {
        const res = await axios.get("/api/listing/get?type=rent&limit=4");
        setRentListings(res.data);
      } catch (error) {
        console.log(error);
      }
    };
  }, []);
  console.log(offerListings);
  // console.log(rentListings)
  // console.log(saleListings)
  return (
    <div>
      {/* top */}
      <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span> place
          <br />
          with ease
        </h1>
        <div className="text-gray-500 text-xs sm:text-sm">
          You can find best in the market here to fulfill your Dream
          <br />
          We have wide range of properties that very awesome and super
          affordable
        </div>
        <Link className="ext-xs sm:text-sm text-blue-800 hover:underline font-bold">
          Let's get Started
        </Link>
      </div>

      {/* swiper */}
      <Swiper navigation>
        {offerListings &&
          offerListings.length > 0 &&
          offerListings.map((item) => {
            return (
              <SwiperSlide key={item}>
                <div
                  style={{
                    background: `url(${item.imageUrls[0]}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                  className="h-[500px]"
                  key={item._id}
                ></div>
              </SwiperSlide>
            );
          })}
      </Swiper>

      {/* listing result for offer */}

      <div className="max-w-6xl mx-auto flex flex-col gap-8 my-10 p-3">
        {offerListings && offerListings.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-slate-700 font-semibold">Recent Offers</h2>
              <Link to="/search?offer=true" className="hover:underline text-blue-700">Show more</Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {offerListings.map((item) => {
                return <ListingItem key={item._id} listItems={item} />;
              })}
            </div>
          </div>
        )}
        {saleListings && saleListings.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <h2 className="text-xl text-slate-700 font-semibold">For Sale</h2>
              <Link to="/search?type=sale" className="hover:underline text-blue-700">Show more</Link>
            </div>
            <div className="flex flex-wrap gap-6">
              {saleListings.map((item) => {
                return <ListingItem key={item._id} listItems={item} />;
              })}
            </div>
          </div>
        )}
        {
            rentListings && rentListings.length > 0 && (
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl text-slate-700 font-semibold">For Rent</h2>
                  <Link to='/search?type=rent' className="hover:underline text-blue-700">Show more</Link>
                </div>
                <div className='flex flex-wrap gap-6'>
                  {
                    rentListings.map((item)=>{
                      return(
                        <ListingItem key={item._id} listItems={item} />
                      )
                    })
                  }
                </div>
              </div>
            )
          }
      </div>
    </div>
  );
};

export default Home;
