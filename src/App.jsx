import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from '../Routers/AppRouter'



const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  )
}

export default App