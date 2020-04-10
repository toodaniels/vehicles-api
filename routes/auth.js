var express = require('express');
var router = express.Router();
const vehicleController = require('../controllers/vehicle.controller');

router.get('/', (req, res) => res.send("Welcome to Vehicles API AUTH v1"));
router.get('/vehicles', vehicleController.getVehicles);
router.post('/vehicles', vehicleController.createVehicle);

router.put('/vehicles/:plate', vehicleController.updateVehicle);
router.get('/vehicles/:plate', vehicleController.getVehicle);
router.delete('/vehicles/:plate', vehicleController.removeVehicle);


module.exports = router;
