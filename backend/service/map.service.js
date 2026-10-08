const axios = require('axios')


module.exports.getLocationAddressCoordinate =async(adress)=>{
    console.log(adress)

    const API_KEY = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(adress)}&key=${API_KEY}`
    try {
        const resp = await axios.get(url);
        console.log(resp);
        if(resp.data.status == 'OK'){
            const location = resp.data.results[0].geometry.location;
            return{
                ltd:location.lat,
                lng:location.lng
            }
        }else{
            throw new Error('unable to fetch new coordinates!!!')
        }
        
    } catch (error) {
        console.log(error)
        throw error;
    }
}


// do jagahon ke beech doori (meters) aur samay (seconds)
module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('origin and destination are required');
    }

    const API_KEY = process.env.GOOGLE_MAP_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${API_KEY}`;

    const resp = await axios.get(url);

    if (resp.data.status !== 'OK') {
        throw new Error(`distance matrix error: ${resp.data.status}`);
    }

    const element = resp.data.rows[0].elements[0];
    if (element.status !== 'OK') {
        throw new Error(`no route found: ${element.status}`);
    }

    return {
        distance: element.distance.value, // meters
        duration: element.duration.value, // seconds
    };
};