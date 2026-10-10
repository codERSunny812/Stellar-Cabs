import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getVehicle } from "../../utils/vechiles";

// user ki jagah: neela dot jiske chaaron taraf lehar chalti hai (CSS: .user-dot)
const userIcon = L.divIcon({
    className: "",
    html: '<div class="user-dot"></div>',
    iconSize: [18, 18],
    iconAnchor: [9, 9],
});

// har gaadi ke type ka ek icon, ek hi baar banao
const vehicleIcons = {};
const getVehicleIcon = (type) => {
    if (!vehicleIcons[type]) {
        const emoji = getVehicle(type)?.emoji ?? "🚗";
        vehicleIcons[type] = L.divIcon({
            className: "",
            html: `<div class="vehicle-pin">${emoji}</div>`,
            iconSize: [34, 34],
            iconAnchor: [17, 17],
        });
    }
    return vehicleIcons[type];
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

// markers = [{ id, lat, lng, vehicleType }]  (paas ke drivers)
// onLocation(position) = jab bhi apni location mile, parent ko batao
const LiveMap = ({ markers = [], onLocation }) => {
    const [position, setPosition] = useState(DEFAULT_POSITION);
    const [hasLocation, setHasLocation] = useState(false);

    // onLocation ko ref mein rakho, taaki har render par watch dobara na lage
    const onLocationRef = useRef(onLocation);
    onLocationRef.current = onLocation;

    useEffect(() => {
        if (!navigator.geolocation) {
            console.log("is browser mein location support nahi hai");
            return;
        }

        // location badalte hi naya position milta rahega
        const watchId = navigator.geolocation.watchPosition(
            (pos) => {
                const next = [pos.coords.latitude, pos.coords.longitude];
                setPosition(next);
                setHasLocation(true);
                onLocationRef.current?.(next);
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
            {/* CARTO light tiles: OSM data, par saaf safed-grey look */}
            {import.meta.env.VITE_CARTO_KEY ? (
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url={`https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png?key=${import.meta.env.VITE_CARTO_KEY}`}
                />
            ) : (
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            )}

            {hasLocation && <Marker position={position} icon={userIcon} />}

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