var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Vehicle = new Schema({
    plate: {
        type : String,
        unique: true,
        required: 'La Placa es requerida'
    },
    location: {
        type: {
          type: String, 
          enum: ['Point'], 
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : 'user',
        default: null,
        required: "Dueño es requerido"
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('vehicle', Vehicle);