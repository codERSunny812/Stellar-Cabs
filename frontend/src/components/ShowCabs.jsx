import React,{forwardRef} from 'react'
import { FaChevronDown, FaChevronUp, FaUser } from "react-icons/fa";

const ShowCabs = forwardRef((props,ref) => {
  return (
      <div ref={ref}  className="fixed w-full  bottom-0 bg-white z-10 px-1 py-1">
          <div className="flex  justify-center mt-2">
              <div className="border-3 border-gray-300 w-1/6 rounded-full mb-2" onClick={() => props.setVechilePanel(false)}></div>
          </div>

          <h3 className="text-2xl capitalize font-semibold text-center mb-4">
              choose your vechile
          </h3>


          {/* vechile 1 */}
          <div 
          onClick={() => {
            props.setVechilePanel(false);
            props.setConfirmVechilePanel(true);
        }}
              className="vechile-1 flex gap-2 items-center justify-between vechile-info active:border active:border-gray-600 rounded-2xl px-3 py-5 mb-2">
              <img src="https://www.svgrepo.com/show/408291/car-white.svg" className="h-24  w-24" alt="uber go" />

              <div className="ride-info">
                  <div className="car-name flex gap-2">
                      <h4 className="text-xl font-bold capitalize">uber go</h4>
                      <div className="capacity-info flex items-center gap-2 justify-center">
                          <FaUser />
                          <span className="text-base font-normal">5</span>
                      </div>
                  </div>
                  <h5 className="font-medium text-base">2 min away</h5>
                  <p className="capitalize text-xs">affortable,compact rides</p>
              </div>

              {/* price of the cab  */}
              <h3 className="font-semibold text-lg">₹198.22</h3>
          </div>



          <div 
            onClick={() => {
                  props.setVechilePanel(false);
                  props.setConfirmVechilePanel(true);
            }}
              className="vechile-2 flex gap-4 items-center justify-between vechile-info active:border active:border-gray-600 rounded-2xl px-3 py-5 mb-2">
              <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_537/v1571927853/assets/39/c1c2c7-61eb-4432-9bac-728b974207e7/original/cityscoot-icon-mobile.png" className="h-22 w-26" alt="uber bike " />

              <div className="ride-info">
                  <div className="car-name flex gap-2">
                      <h4 className="text-xl font-bold capitalize">uber bike</h4>
                      <div className="capacity-info flex items-center gap-2 justify-center">
                          <FaUser />
                          <span className="text-base font-normal">1</span>
                      </div>
                  </div>
                  <h5 className="font-medium text-base">2 min away</h5>
                  <p className="capitalize text-xs">affortable,compact rides</p>
              </div>

              {/* price of the cab  */}
              <h3 className="font-semibold text-lg">₹98.22</h3>
          </div>

          <div
            onClick={() =>{
                  props.setVechilePanel(false);
                  props.setConfirmVechilePanel(true);
            }} 
            className="vechile-3 flex gap-4 items-center justify-between vechile-info active:border active:border-gray-600 rounded-2xl px-3 py-5 mb-2">
              <img src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" className="h-20  w-24" alt="uber auto" />

              <div className="ride-info">
                  <div className="car-name flex gap-3">
                      <h4 className="text-xl font-bold capitalize">uber auto</h4>
                      <div className="capacity-info flex items-center gap-2 justify-center">
                          <FaUser />
                          <span className="text-base font-normal">3</span>
                      </div>
                  </div>
                  <h5 className="font-medium text-base">2 min away</h5>
                  <p className="capitalize text-xs">affortable,compact rides</p>
              </div>

              {/* price of the cab  */}
              <h3 className="font-semibold text-lg">₹118.22</h3>
          </div>

      </div>
  )
});

export default ShowCabs