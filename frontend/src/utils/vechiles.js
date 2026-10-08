import { FaCarSide, FaMotorcycle } from "react-icons/fa";
import { MdElectricRickshaw } from "react-icons/md";

// teeno gaadiyan ek hi jagah; "type" wahi hai jo backend mein use hota hai
export const VEHICLES = [
    { type: "car", name: "uber go", capacity: 4, desc: "affordable, compact rides", icon: FaCarSide },
    { type: "bike", name: "uber bike", capacity: 1, desc: "quick bike rides", icon: FaMotorcycle },
    { type: "auto", name: "uber auto", capacity: 3, desc: "affordable auto rides", icon: MdElectricRickshaw },
];

// type se gaadi ki detail nikaalo, jaise getVehicle("car")
export const getVehicle = (type) => VEHICLES.find((vehicle) => vehicle.type === type);