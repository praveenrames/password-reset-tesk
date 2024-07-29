import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../src/Compontes/Home'
import Sign_up from '../src/Compontes/Sign_up'
import Sign_in from '../src/Compontes/Sign_in'
import Reset_Password from '../src/Compontes/Reset_Password'
import Forgot_Password from '../src/Compontes/Forgot_Password'

const AppRouter = () => {
  return (
    <>
      <Routes>
         <Route path='/home' element={<Home/>}/>
         <Route path='/sign-up' element={<Sign_up />}/>
         <Route path='/sign-in' element={<Sign_in />}/>
         <Route path='/forgot-password' element={<Forgot_Password />}/>
         <Route path='/reset-Password' element={<Reset_Password />}/>
         <Route path='/' element={<Home />}/>
         <Route path='/*' element={<Navigate to='/' />}/>
      </Routes>
    </>
  )
}

export default AppRouter