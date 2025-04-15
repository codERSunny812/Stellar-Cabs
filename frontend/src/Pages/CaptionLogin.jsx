import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import imageUrl from '../assets/uber-black.png'
import { BiArrowBack } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";

const CaptionLogin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [captionData, setCaptionData] = useState({})
    const [showPassword, setShowPassword] = useState(false);

    const handleLoginForm = (e) => {
        e.preventDefault();
        console.log("user email is:", email);
        console.log("user password is", password);
        setCaptionData({
            email: email,
            password: password
        })
        setEmail("");
        setPassword("")
    }
    return (
        <div className="">
            <div className="h-screen p-7 flex flex-col justify-between">

                <div className="images flex gap-2.5">
                    <Link to='/login'>
                        <BiArrowBack className='h-9 w-9' />
                    </Link>
                    <img src={imageUrl} className='w-16 mb-10' alt="" />
                </div>
                <div className="form">
                    <form action="" onSubmit={(e) => handleLoginForm(e)}>
                        <h2
                            className='font-medium text-xl capitalize mb-2'
                        >what's your mail?</h2>
                        <input
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='email@example.com'
                            className='bg-[#eeee] w-full px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7'
                        />

                        <h2
                            className='mt-3 font-medium text-xl capitalize mb-2'
                        >what's your password?</h2>
                        <div className="flex items-center justify-between bg-[#eeee]   w-full  rounded-lg mt-1 text-lg placeholder:text-sm mb-7">
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder='enter your password'
                                className='w-full px-4 py-2'
                            />
                            {
                                !showPassword ? (
                                    <FaEyeSlash className='mx-3.5 h-6 w-6 cursor-pointer' onClick={() => setShowPassword(true)} />
                                ) : (
                                    <FaEye className='cursor-pointer mx-3.5 h-5 w-5 ' onClick={() => setShowPassword(false)} />

                                )
                            }
                        </div>


                        <button className='bg-black text-white w-full  py-2 px-2 rounded text-lg font-semibold'>login as caption</button>

                        <p className='text-center capitalize mt-4 font-semibold'>don't have an account ?
                            <Link className='text-blue-400 ml-1' to="/caption-signup">
                                create one
                            </Link></p>
                    </form>
                </div>

                <div className="">
                    <Link to='/login'>
                        <button className='bg-[#80CBC4] text-white w-full  py-2 px-2 rounded text-lg font-semibold' >login as user</button>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default CaptionLogin;