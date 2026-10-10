import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Vite mein Leaflet ke default marker icon ka path toot jaata hai, isliye khud set karte hain
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// meri apni jagah ka neela marker
const defaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

// drivers ke liye gaadi ke hisaab se icon
const VEHICLE_EMOJI = { car: "🚗", bike: "🏍️", auto: "🛺" };
const vehicleIcons = {};
const getVehicleIcon = (type) => {
    const key = VEHICLE_EMOJI[type] ? type : "car";
    if (!vehicleIcons[key]) {
        vehicleIcons[key] = L.divIcon({
            html: `<div style="font-size:26px;line-height:26px">${VEHICLE_EMOJI[key]}</div>`,
            className: "",
            iconSize: [26, 26],
            iconAnchor: [13, 13],
        });
    }
    return vehicleIcons[key];
};

// location na mile tab tak Pune dikhao
const DEFAULT_POSITION = [18.5204, 73.8567];

// position badalne par map ko us jagah le jao
const Recenter = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(position, map.getZoom());
    }, [position, map]);

    return null;
};

// markers: [{ id, lat, lng, vehicleType }]  (dusre drivers)
// onLocation: meri location milte hi call hota hai, [lat, lng] ke saath
const LiveMap = ({ markers = [], onLocation }) => {
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [hasLocation, setHasLocation] = useState(false);

    // onLocation badalne par watchPosition dobara shuru na ho, isliye ref
    const onLocationRef = useRef(onLocation);
    useEffect(() => {
        onLocationRef.current = onLocation;
    }, [onLocation]);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("is browser mein location support nahi hai");
            return;
        }

        // location badalte hi naya position milta rahega
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const newPosition = [pos.coords.latitude, pos.coords.longitude];
                setPosition(newPosition);
                setHasLocation(true);
                onLocationRef.current?.(newPosition);
            },
            (error) => {
                console.log("location error:", error.message);
            },
            { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
        );

        // page band hone par location lena band karo
        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    return (
        <MapContainer
            center={position}
            zoom={15}
            zoomControl={false}
            className="h-full w-full"
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {hasLocation && (
                <Marker position={position} icon={defaultIcon}>
                    <Popup>aap yahan ho</Popup>
                </Marker>
            )}

            {/* aas-paas ke drivers */}
            {markers.map((marker) => (
                <Marker
                    key={marker.id}
                    position={[marker.lat, marker.lng]}
                    icon={getVehicleIcon(marker.vehicleType)}
                />
            ))}

            <Recenter position={position} />
        </MapContainer>
    );
};

export default LiveMap;