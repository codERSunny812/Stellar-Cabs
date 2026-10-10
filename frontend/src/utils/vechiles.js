import { FaCarSide, FaMotorcycle } from "react-icons/fa";
import { MdElectricRickshaw } from "react-icons/md";

// teeno gaadiyan ek hi jagah; "type" wahi hai jo backend mein use hota hai
// emoji = map par driver ki pin
export const VEHICLES = [
    { type: "car", name: "Stellar Go", capacity: 4, desc: "Affordable, compact rides", icon: FaCarSide, emoji: "🚗" },
    { type: "auto", name: "Stellar Auto", capacity: 3, desc: "Quick auto rides", icon: MdElectricRickshaw, emoji: "🛺" },
    { type: "bike", name: "Stellar Moto", capacity: 1, desc: "Beat the traffic", icon: FaMotorcycle, emoji: "🏍️" },
];

// type se gaadi ki detail nikaalo, jaise getVehicle("car")
export const getVehicle = (type) => VEHICLES.find((vehicle) => vehicle.type === type);