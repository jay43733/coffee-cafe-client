import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppRouter from './router/AppRouter';

const App = () => {
  return (
    <div className='font-sans bg-[#ECF1F6] min-h-screen pt-4'>
      <ToastContainer/>
      <AppRouter />
    </div>
  )
}

export default App