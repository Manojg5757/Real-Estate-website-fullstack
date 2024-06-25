import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import {Swiper,SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'

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
                             <div className='h-[550px]'
                             style={{background:`url(${item}) center no-repeat`,backgroundSize:'cover'}}
                             >

                             </div>
                          </SwiperSlide>
                        )
                      })
                     }
                  </Swiper>
                </div>
            )
        }
    </div>
  )
}

export default Listing