const Button = ({ text, setDriverRidePopUp, setOpenDriverRidePanel }) => {
  return (
      <div className={`${text === "accept" ? "bg-green-500" : "bg-gray-500"} px-10 py-3 rounded-lg text-white`}
      onClick={()=>{ 
        if(text == "cancel"){
          setDriverRidePopUp(false);
        }else if(text == "accept"){
        setDriverRidePopUp(false);
        setOpenDriverRidePanel(true);
        }
      }}
      >
        <h1 className='font-semibold text-base capitalize'>{text}</h1>
    </div>
  )
}

export default Button