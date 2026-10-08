const axios = require('axios');

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving';

// Nominatim ka niyam: har request mein app ka naam aur contact batana zaroori hai
const HEADERS = {
    'User-Agent': 'StellarCabs/1.0 (learning project; sengersunny448@gmail.com)',
};

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// address -> latitude, longitude
module.exports.getLocationAddressCoordinate = async (address) => {
    if (!address) {
        throw new Error('address is required');
    }

    const resp = await axios.get(NOMINATIM_URL, {
        params: { q: address, format: 'json', limit: 1, countrycodes: 'in' },
        headers: HEADERS,
    });

    if (!resp.data.length) {
        throw new Error(`location not found: ${address}`);
    }

    return {
        ltd: parseFloat(resp.data[0].lat),
        lng: parseFloat(resp.data[0].lon),
    };
};

// do jagahon ke beech doori (meters) aur samay (seconds)
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('origin and destination are required');
    }

    const from = await module.exports.getLocationAddressCoordinate(origin);
    await wait(1000); // Nominatim ek second mein ek hi request allow karta hai
    const to = await module.exports.getLocationAddressCoordinate(destination);

    // OSRM mein pehle longitude aata hai, phir latitude
    const url = `${OSRM_URL}/${from.lng},${from.ltd};${to.lng},${to.ltd}`;

    const resp = await axios.get(url, {
        params: { overview: 'false' },
        headers: HEADERS,
    });

    if (resp.data.code !== 'Ok' || !resp.data.routes.length) {
        throw new Error('no route found between these locations');
    }

    const route = resp.data.routes[0];

    return {
        distance: Math.round(route.distance), // meters
        duration: Math.round(route.duration), // seconds
    };
};