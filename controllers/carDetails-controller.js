const Car = require('mongoose').model('Cars')
const User = require('mongoose').model('User')
const BookedCars = require('mongoose').model('BookedCars')

module.exports = {
    viewDetails: (req, res) => {

        //we take from the URL the id of the selected car "carDetails / 59e7aeec76630b07606369ac" and route it to the set path "/carDetails/:id"
        let id = req.params.id
        Car.findById(id).then(foundCar => {
            res.render('carDetails', { foundCar })
        })
    },
    takeCar: (req, res) => {
        let id = req.body.carId
        let userId = req.user._id   //req.user takes the logged in user from the passport
        let BookedCarsObj = {}   

        Car.findById(id).then(foundCar => {
            User.findById(userId).then(user => {
                user.rentedCars.push(foundCar._id)
                user.save().then(()=>{
                    foundCar.isRendet = true
                    foundCar.save().then(()=>{
                        BookedCarsObj={
                            car: foundCar._id,
                            user: userId,
                            dateissue: req.body.dateOfRental,
                            datereturn: req.body.daysOfRental
                        }

                        console.log(BookedCarsObj)
                        BookedCars.create(BookedCarsObj).then(()=>{
                            res.redirect('/')
                        })
                    })
                })
            })
        })  
    }
}

