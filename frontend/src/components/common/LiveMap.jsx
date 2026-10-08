import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Vite mein Leaflet ke default marker icon ka path toot jaata hai, isliye khud set karte hain
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});

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

const LiveMap = () => {
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [hasLocation, setHasLocation] = useState(false);

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("is browser mein location support nahi hai");
            return;
        }

        // location badalte hi naya position milta rahega
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                setPosition([pos.coords.latitude, pos.coords.longitude]);
                setHasLocation(true);
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

            <Recenter position={position} />
        </MapContainer>
    );
};

export default LiveMap;