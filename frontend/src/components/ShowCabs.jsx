import { forwardRef } from "react";
import { FaUser } from "react-icons/fa";
import { VEHICLES } from "../utils/vehicles";

const ShowCabs = forwardRef(({ fareData, onSelect, setVechilePanel }, ref) => {
    const km = fareData ? (fareData.distance / 1000).toFixed(1) : null;
    const minutes = fareData ? Math.round(fareData.duration / 60) : null;

    return (
        <div ref={ref} className="fixed w-full bottom-0 bg-white z-10 px-1 py-1">
            <div className="flex justify-center mt-2">
                <div
                    className="border-3 border-gray-300 w-1/6 rounded-full mb-2"
                    onClick={() => setVechilePanel(false)}
                ></div>
            </div>

            <h3 className="text-2xl capitalize font-semibold text-center mb-1">
                choose your vehicle
            </h3>

            {fareData && (
                <p className="text-center text-sm text-gray-500 mb-3">
                    {km} km · about {minutes} min
                </p>
            )}

            {VEHICLES.map((vehicle) => (
                <div
                    key={vehicle.type}
                    onClick={() => onSelect(vehicle.type)}
                    className="flex gap-2 items-center justify-between active:border active:border-gray-600 rounded-2xl px-3 py-5 mb-2"
                >
                    {/* gaadi ka icon */}
                    <vehicle.icon className="h-14 w-20 text-gray-800" />

                    <div className="ride-info">
                        <div className="car-name flex gap-2">
                            <h4 className="text-xl font-bold capitalize">{vehicle.name}</h4>
                            <div className="capacity-info flex items-center gap-2 justify-center">
                                <FaUser />
                                <span className="text-base font-normal">{vehicle.capacity}</span>
                            </div>
                        </div>
                        <p className="capitalize text-xs">{vehicle.desc}</p>
                    </div>

                    {/* backend se aaya asli kiraya */}
                    <h3 className="font-semibold text-lg">
                        ₹{fareData?.fares?.[vehicle.type] ?? "--"}
                    </h3>
                </div>
            ))}
        </div>
    );
});

export default ShowCabs;