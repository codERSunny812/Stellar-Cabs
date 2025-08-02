const express = require('express');
const { getCoordinates} = require('../controller/map.controller');
const MapRouter = express.Router();

MapRouter.get('/get-coordinate',getCoordinates)


module.exports=MapRouter