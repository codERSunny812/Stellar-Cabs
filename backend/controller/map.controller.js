const  { getLocationAddressCoordinate } = require( "../service/map.service");


module.exports.getCoordinates=async(req,res,next)=>{

    
    const {address} = req.query;
    console.log(address)

    try {
     const coordinate = await getLocationAddressCoordinate(address);
     res.status(200).json(coordinate)
    } catch (error) {
        res.status(500).json({
            message:"Internal server error"
        })
    }

}