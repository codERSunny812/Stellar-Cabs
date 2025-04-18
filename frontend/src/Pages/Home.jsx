import React from 'react'
import imageUrl from '../assets/uber.png'
import { Link } from 'react-router-dom'
import bgPng from '../assets/BgImage.png'

const Home = () => {
    return (
        <div className="">
            <div
                className="h-screen overflow-hidden w-full flex flex-col justify-between pt-4"
                style={{
                    backgroundImage: `url(${bgPng})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <img className='w-24 ml-5' src={imageUrl} alt="" />
                <div className="bg-white p-4 pb-8 mb-6">
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