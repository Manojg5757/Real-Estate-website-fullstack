import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import Signin from './pages/Signin'
import SignOut from './pages/SignOut'
import Header from './components/Header'

const App = () => {
  return (
   <BrowserRouter>
   <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/signout' element={<SignOut />} />
      </Routes>
   </BrowserRouter>
  )
}

export default App