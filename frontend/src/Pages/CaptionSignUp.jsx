import React, { useContext, useState } from "react";
import imageUrl from "../assets/uber-black.png";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import { CaptionContext } from "../Context/CaptionContext";

const CaptionSignUp = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [vechileColor, setVechileColor] = useState("");
  const [vechileModel, setVechileModel] = useState("");
  const [vechileNumber, setVechileNumber] = useState("");
  const [vechileType, setVechileType] = useState("");
  const [vechileCapacity, setVechileCapacity] = useState("");

  console.log("vechile type is", vechileType);

  const { setCaptionData } = useContext(CaptionContext);

  const handleSignupForm = (e) => {
    e.preventDefault();
    console.log("user email is:", email);
    console.log("user password is", password);
    const newCaptionData = {
      fullName: {
        firstname: firstname,
        lastname: lastname,
      },
      email: email,
      password: password,
      vechile: {
        color: vechileColor,
        model: vechileModel,
        number: vechileNumber,
        type: vechileType,
        capacity: vechileCapacity,
      },
    };

    console.log("the caption data is:", newCaptionData);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setVechileColor("");
    setVechileModel("");
    setVechileNumber("");
    setVechileType("");
    setVechileCapacity("");
  };

  return (
    <div className="">
      <div className="h-screen p-3 flex flex-col justify-between">
        {/* the top section of the page */}
        <div className="images flex gap-3">
          <Link to="/login">
            <BiArrowBack className="h-9 w-9" />
          </Link>
          <img src={imageUrl} className="w-16 mb-3" alt="" />
        </div>

        {/* form to the caption sign up */}
        <div className="w-full">
          <form action="" onSubmit={(e) => handleSignupForm(e)}>
            {/* name of the user  */}
            <h2 className="font-medium text-lg capitalize mb-1">
              what's your name?
            </h2>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="first Name"
                className="bg-[#eeee] w-1/2 px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7"
              />
              <input
                type="text"
                required
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="last Name"
                className="bg-[#eeee] w-1/2 px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7"
              />
            </div>

            {/* email of the user  */}
            <h2 className="font-medium text-lg capitalize mb-1">
              what's your mail?
            </h2>
            <input
              type="text"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="bg-[#eeee] w-full px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7"
            />

            <h2 className="font-medium text-lg capitalize mb-2">
              what's your password?
            </h2>
            <div className="flex items-center justify-between bg-[#eeee]   w-full  rounded-lg mt-1 text-lg placeholder:text-sm mb-7">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="enter your password"
                className="w-full px-4 py-2"
              />
              {!showPassword ? (
                <FaEyeSlash
                  className="mx-3.5 h-6 w-6 cursor-pointer"
                  onClick={() => setShowPassword(true)}
                />
              ) : (
                <FaEye
                  className="cursor-pointer mx-3.5 h-5 w-5 "
                  onClick={() => setShowPassword(false)}
                />
              )}
            </div>

            {/* vechile details */}
            <h2 className="font-medium text-lg capitalize mb-2">
              enter your vechile details?
            </h2>
            <div className="flex flex-col">
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={vechileColor}
                  onChange={(e) => setVechileColor(e.target.value)}
                  placeholder="vechile color"
                  className="bg-[#eeee] w-1/2 px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7"
                />

                <input
                  type="text"
                  required
                  value={vechileCapacity}
                  onChange={(e) => setVechileCapacity(e.target.value)}
                  placeholder="vechile capacity"
                  className="bg-[#eeee] w-1/2 px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7"
                />
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={vechileModel}
                  onChange={(e) => setVechileModel(e.target.value)}
                  placeholder="vechile model"
                  className="bg-[#eeee] w-1/2 px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7"
                />

                <select
                  required
                  className="bg-[#eeee] w-1/2 px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7"
                  value={vechileType}
                  onChange={(e) => setVechileType(e.target.value)}
                >
                  <option value="" className="capitalize" disabled>
                    {" "}
                    select vechile:
                  </option>
                  <option value="car">car</option>
                  <option value="bike">bike</option>
                  <option value="auto">auto</option>
                </select>
                {/* <input
                                  type="text"
                                  required
                                  value={vechileModel}
                                  onChange={(e) => setVechileModel(e.target.value)}
                                  placeholder="vechile model"
                                  className="bg-[#eeee] w-1/2 px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7"
                              /> */}
              </div>

              <input
                type="text"
                required
                value={vechileNumber}
                onChange={(e) => setVechileNumber(e.target.value)}
                placeholder="vechile number"
                className="bg-[#eeee] w-full px-4 py-2 rounded-lg mt-1 text-lg placeholder:text-lg mb-7"
              />
            </div>

            <button className="bg-black text-white w-full  py-2 px-2 rounded text-lg font-semibold">
              sign up as caption
            </button>

            <p className="text-center capitalize mt-4 font-semibold">
              Already have an account ?
              <Link className="text-blue-400 ml-1" to="/caption-login">
                log in
              </Link>
            </p>
          </form>
        </div>

        <div className="text-xs text-center">
          <p>
            " This site is protected by reCAPTCHA and the{" "}
            <span className="font-semibold">Google Privacy Policy</span> and{" "}
            <span className="font-semibold">Terms of Service apply</span> "
          </p>
        </div>
      </div>
    </div>
  );
};

export default CaptionSignUp;
