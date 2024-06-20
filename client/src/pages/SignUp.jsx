import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import OAuth from '../components/OAuth'

const SignUp = () => {
  const[error,setError] = useState(null)
  const[loading,setLoading] = useState(false)
  const navigate = useNavigate()
  const[formData,setFormData] = useState({
    username:'',
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
    setLoading(true)
    const res  =await axios.post('/api/auth/signup',formData)
    if(res){
      setLoading(false)
      setError(null)
      navigate('/signin')
    }
    console.log(res.data)
  } catch (error) {
    if(error.response.data.success === false){
      setError(error.response.data.message)
      setLoading(false)
    }
  }
}

console.log(error)

  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>SignUp</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <input type="text" id='username' placeholder='Username...' className='rounded-lg p-3' onChange={handleChange} />
        <input type="email" id='email' placeholder='Email...' className='rounded-lg p-3' onChange={handleChange} />
        <input type="password" id='password' placeholder='Password...' className='rounded-lg p-3' onChange={handleChange} />
        <button disabled={loading} type='submit' className='bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-70'>
          {
            loading? "Loding..." : "SIGNUP"
          }
        </button>
        <OAuth />
      </form>
      {

      }
      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to='/signin'>
        <span className='text-blue-500'>Signin</span>
        </Link>
      </div>

      {error && <p>{error}</p>}
    </div>
  )
}

export default SignUp