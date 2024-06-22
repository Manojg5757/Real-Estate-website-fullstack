import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { signinStart,signinSuccess,signinFailure } from '../redux/user/userSlice'
import axios from 'axios'
import OAuth from '../components/OAuth'

const Signin = () => {
  const {loading,error} = useSelector(state=>state.user)
  
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const[formData,setFormData] = useState({
    email:'',
    password:''
  })

const handleChange = (e)=>{
  const {id,value} = e.target
  setFormData({
    ...formData,
    [id]:value
  })
}
console.log(formData)

const handleSubmit = async(e)=>{
  e.preventDefault()
   
  try {
    dispatch(signinStart())
    const res  =await axios.post('/api/auth/signin',formData)
    console.log(res.data)
    if(res){
      dispatch(signinSuccess(res.data))
      navigate('/')
    }
    console.log(res.data)
  } catch (error) {
    if(error.response.data.success === false){
      dispatch(signinFailure(error.response.data.message))
    }
  }
}

console.log(error)

  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>SignIn</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="email" id='email' placeholder='Email...' className='rounded-lg p-3' onChange={handleChange} />
        <input type="password" id='password' placeholder='Password...' className='rounded-lg p-3' onChange={handleChange} />
        <button disabled={loading} type='submit' className='bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-70'>
          {
            loading? "Loding..." : "SIGN IN"
          }
        </button>
        <OAuth />
      </form>
      {

      }
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an Account?</p>
        <Link to='/signup'>
        <span className='text-blue-500'>Signup</span>
        </Link>
      </div>

      {error && <p>{error}</p>}
    </div>
  )
}

export default Signin