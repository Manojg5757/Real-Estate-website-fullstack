import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import { FaBedPulse } from "react-icons/fa6";
import { FaCar } from "react-icons/fa6";
import { GrRestroom } from "react-icons/gr";
import { RiSofaFill } from "react-icons/ri";


const Listing = () => {
  SwiperCore.use(Navigation)
    const{id} = useParams()
    const[listing,setListing] = useState()
    const[loading,setLoading] = useState(false)
    const[error,setError] = useState(false)
    useEffect(()=>{
       const fetchData = async()=>{
        try {
            setLoading(true)
            const res = await axios.get('/api/listing//listingpage/'+id)
        setListing(res.data)
        setError(null)
        setLoading(false)

        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
       }
       fetchData()
    },[id])
    console.log(listing)
  return (
    <div>
         {loading ? <p className='text-center text-4xl my-4'>Loading...</p> :""}
       {
        error ? <p className='text-center text-4xl my-4'>Something Went Wrong</p> : ""
        }

        {
            listing && !loading && !error && (
                <div>
                  <Swiper navigation>
                     {
                      listing.imageUrls.map((item)=>{
                        return(
                          <SwiperSlide key={item}>
                             <div className='h-[300px] sm:h-[550px]'
                             style={{background:`url(${item}) center no-repeat`,backgroundSize:'cover'}}
                             >

                             </div>
                          </SwiperSlide>
                        )
                      })
                     }
                  </Swiper>
                  <div className='max-w-4xl mx-auto flex flex-col gap-4 p-3'>
                    <h1 className='text-3xl'>{listing.name}</h1>
                    <div className='flex gap-4'>
                    <p className='bg-red-900 px-12 py-1 text-white rounded'>
                      {
                        listing.type === 'rent' ? "For Rent" : "Sale"
                      }
                    </p>
                    {
                      listing.offer ? <p className=' bg-gray-500 text-white px-4 py-1 rounded'><span className='line-through'>${listing.regularPrice}</span> {listing.type === 'rent' ? <span>/month</span> : "" }</p> :
                      <p className='bg-green-600 text-white px-12 py-1 rounded'>${listing.regularPrice} {listing.type === 'rent' ? <span>$/month</span> : "" }</p>
                    }
                    {
                      listing.offer ? <p className='bg-green-600 text-white px-12 py-1 rounded'>${listing.discountedPrice} {listing.type === 'rent' ? <span>/month</span> : "" }</p> : ""
                    }
                    </div>
                    <p>
                    <span className='font-semibold w-[100%]'>Description</span> - {listing.description}
                  </p>
                  <ul className='flex gap-4 flex-wrap'>
                    <li className='flex items-center gap-2'><FaBedPulse />{listing.bedRooms ? `${listing.bedRooms} Beds` : "Bed"}</li>
                    <li className='flex items-center gap-2'><GrRestroom />{listing.bathRooms ? `${listing.bathRooms} Rest Rooms` : "Rest Room"}</li>
                    <li className='flex items-center gap-2'><FaCar />{listing.parking ? "Parking Available" : "No Parking"}</li>
                    <li className='flex items-center gap-2'><RiSofaFill />{listing.furnished ? 'Furnished' : "Not Furnished"}</li>
                  </ul>
                  </div>
                  
                </div>
            )
        }
    </div>
  )
}

export default Listing