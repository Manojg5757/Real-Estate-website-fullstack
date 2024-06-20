import {GoogleAuthProvider, getAuth, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { signinSuccess } from '../redux/user/userSlice'
import {useNavigate} from 'react-router-dom'

const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleClick = async()=>{
          try {
            const provider =new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth,provider)  
            const res = await axios.post('/api/auth/google',{
                username:result.user.displayName,
                email:result.user.email,
                photo:result.user.photoURL
            })
            dispatch(signinSuccess(res.data))
            navigate('/')

          } catch (error) {
            console.log(error)
          }
    }
  return (
    <button type='button' onClick={handleClick} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with google</button>
  )
}

export default OAuth