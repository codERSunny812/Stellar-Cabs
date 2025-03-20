import React, { useContext, useState } from 'react'
import imageUrl from '../assets/uber-black.png'
import { Link } from 'react-router-dom';
import { BiArrowBack } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/User.context';

const UserSignUp = () => {
        const[firstname,setFirstName]= useState("");
        const [lastname,setLastName] = useState("");
        const [email,setEmail] = useState("");
        const [password,setPassword] = useState("");
        const[showPassword,setShowPassword] = useState(false);

        const {userData, setUserData} = useContext(UserContext);

        const navigate = useNavigate();
    
        // function to handle the sign up
        const handleSignupForm = async(e) => {
            e.preventDefault();
            console.log("user email is:",email);
            console.log("user password is",password);
            
            const newUser = {
                fullName:{
                    firstname:firstname,
                    lastname:lastname
                },
                email:email,
                password:password
            }

            // send the data to the backend
            const resp = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser)

            if(resp.status === 200){
                console.log("user created successfully")
                const data = resp.data;
                console.log("data",data)

                setUserData(data.data);

            }

            setEmail("");
            setFirstName("");
            setLastName("");
            setPassword("");

            navigate('/login')
        }

  return (
     <div className="">
            <div className="h-screen p-5 flex flex-col justify-between items-start">
               
               {/* the top section of the page */}
                <div className="images flex gap-3">
                 <Link to='/login'>
                <BiArrowBack className='h-9 w-9'/>
                 </Link>   
                <img src={imageUrl} className='w-16 mb-10' alt="" />
                </div>

                <div className="w-full">
                    <form action="" onSubmit={(e)=> handleSignupForm(e)}>

                      <h2
                          className='font-medium text-lg capitalize mb-2'
                      >what's your name?</h2>
                      <div className="flex gap-2 mb-6">
                          <input
                              type="text"
                              required
                              value={firstname}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder='first Name'
                              className='bg-[#eeee] w-1/2 px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7'
                          />
                          <input
                              type="text"
                              required
                              value={lastname}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder='last Name'
                              className='bg-[#eeee] w-1/2 px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7'
                          />
                      </div>
                      

                        <h2 
                        className='font-medium text-lg capitalize mb-2'
                        >what's your mail?</h2>
                        <input 
                        type="text" 
                        required
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        placeholder='email@example.com' 
                        className='bg-[#eeee] w-full px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7'
                        />
    
                        <h2
                        className='mt-3 font-medium text-lg capitalize mb-2'
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
                                          <FaEye className = 'cursor-pointer mx-3.5 h-5 w-5 ' onClick = { ()=> setShowPassword(false) } />
                                          
                                    )
                              } 
                        </div>
                        
    
                        <button className='bg-black text-white w-full  py-2 px-2 rounded text-lg font-semibold'>sign up</button>
    
                        <p className='text-center capitalize mt-4 font-semibold'>Already have an account ? 
                            <Link className='text-blue-400 ml-1' to="/login">
                             log in
                        </Link></p>
                    </form>
                </div>
    
                <div className="text-xs text-center">
                  <p> This site is protected by reCAPTCHA and the <span className='font-semibold'>Google Privacy Policy</span>  and <span className='font-semibold'>Terms of Service apply</span> </p>
                </div>
    
            </div>
        </div>
  )
}

export default UserSignUp;