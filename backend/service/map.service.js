const axios = require('axios')
module.exports.getLocationAddress.coordinates =async(adress)=>{

    const API_KEY = process.env.GOOGLE_MAP_API_KEY;
    const url = ``
    try {
        const resp = await axios.get(url);
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