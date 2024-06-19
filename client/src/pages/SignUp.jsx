import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>SignUp</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" id='username' placeholder='Username...' className='rounded-lg p-3' />
        <input type="email" id='email' placeholder='Email...' className='rounded-lg p-3' />
        <input type="password" id='password' placeholder='Password...' className='rounded-lg p-3' />
        <button className='bg-slate-700 p-3 text-white uppercase rounded-lg hover:opacity-95 disabled:opacity-70'>SignUp</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an Account?</p>
        <Link to='/signin'>
        <span className='text-blue-500'>Signin</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp