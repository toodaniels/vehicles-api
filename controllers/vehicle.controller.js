const Vehicle = require('../models/vehicle.model');

const getVehicles = async (req, res) =>{
    const {user : { _id }} = req;
    try {
        const vehiclesResult = await Vehicle.find({owner : _id});
        res.status(200).json(vehiclesResult);
    }catch(err){
        res.status(400).json({err});
    }
};

const createVehicle = async (req, res) =>{
    const { user : { _id } } = req;
    var vehicleData =  req.body;
    vehicleData.location = { type : "Point", coordinates : vehicleData.location };
    try {
        const vehicleCreated = await Vehicle.create({ ...vehicleData, owner: _id});
        res.status(201).json(vehicleCreated);
    }catch(err) {
        res.status(400).json(err);
    }
};

const updateVehicle =  async (req, res) =>{
    const { user : { _id } } = req;
    const { params : { plate } } = req;
    var vehicleData =  req.body;
    vehicleData.location = { type : "Point", coordinates : vehicleData.location };
    try {
        await Vehicle.updateOne( { plate, owner: _id } , vehicleData);
        res.status(204).json('success');
    }catch(err) {
        res.status(400).json(err);
    }
};

const getVehicle = async (req, res)=>{
    const { user : { _id } } = req;
    var { plate } =  req.params;
    try {
        const vehicleResult = await Vehicle.findOne( { plate, owner: _id });
        const vehicle = await vehicleResult.toObject();
        res.status(200).json(vehicle);
    }catch(err) {
        res.status(400).json(err);
    }
};

const removeVehicle = async (req, res) =>{
    const { user : { _id } } = req;
    var { plate } =  req.params;
    try {
        await Vehicle.deleteOne( { plate, owner: _id });
        res.status(204).json('success');
    }catch(err) {
        res.status(400).json(err);
    }
}

module.exports = {
    getVehicles,
    createVehicle,
    updateVehicle,
    getVehicle,
    removeVehicle,
};