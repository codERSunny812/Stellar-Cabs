import React from 'react'
import imageUrl from '../assets/uber.png'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="">
      <div className="bg-center bg-cover   bg-[url(https://images.unsplash.com/photo-1516083649464-1740d081bc44?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FiJTIwYm9va2luZ3xlbnwwfHwwfHx8MA%3D%3D)] h-screen w-full flex flex-col justify-between pt-4">
        <img className='w-24 ml-4' src={imageUrl} alt="" />
     <div className="bg-white p-4 pb-8">
      <h1 className='font-bold capitalize text-2xl'>getting started with uber</h1>
      <Link to='/login' className='cursor-pointer'>
      <button className='bg-black text-white w-full px-4 py-3 mt-5 rounded capitalize font-bold text-lg'>continue</button>
      </Link>
     </div>
    </div>
    </div>
  )
}

export default Home