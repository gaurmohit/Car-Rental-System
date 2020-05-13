module.exports = {
    dev: {
        port: process.env.PORT || 5000,
        dbPath: 'mongodb://localhost:27017/car_data'
    },
    production: {}
};