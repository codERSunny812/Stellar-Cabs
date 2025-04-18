import React from 'react'
import { IoLocation } from "react-icons/io5";

const LocationSearchPanel = (props) => {

    const locationData = [
        {
            id: 1,
            name: "hazratganj , lucknow , uttar pradesh",
            distance: "2.5 km",
            time: "10 min",
        },
        {
            id: 2,
            name: "aminabad , lucknow , uttar pradesh",
            distance: "2.5 km",
            time: "10 min",
        },
        {
            id: 3,
            name: "arjunganj , lucknow , uttar pradesh",
            distance: "2.5 km",
            time: "10 min",
        },
        {
            id: 4,
            name: "aliganj , lucknow , uttar pradesh",
            distance: "2.5 km",
            time: "10 min",
        }
    ]
  return (
    <>

    {
        locationData.map((location) => {
            return(
            <div onClick={()=> {
            props.setVechilePanel(true)
            props.setOpenPanel(false)
            }
            } key={location.id} className="flex items-center justify-start gap-4 p-4 my-2">
                <span className='bg-[#898787] p-2 rounded-full'>
                    <IoLocation />
                </span>
                <h3 className='text-lg font-semibold capitalize'>
                    {location.name}
                </h3>
            </div>
            )
})
    }
   
    </>
  )
}

export default LocationSearchPanel