const mongoose = require('mongoose');
const User = require('mongoose').model('User');
const Car = require('mongoose').model('Cars');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookedCarSchema = new mongoose.Schema({
    car: {
        type: ObjectId,
        required: true,
        ref: 'Car'
    },
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    dateissue: {
        type: Date,
        required: true
    },
    datereturn: {
        type: Date,
        required: true
    }, 
},{
    usePushEach: true
  })

const BookedCars = mongoose.model('BookedCars', bookedCarSchema);

module.exports = BookedCars;