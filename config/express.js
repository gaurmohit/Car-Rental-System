const express = require('express');
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const path = require('path');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');

module.exports = app => {
    app.engine('.hbs', expressHandlebars({
        defaultLayout: 'main',
        extname: '.hbs',
        handlebars: allowInsecurePrototypeAccess(Handlebars)
    }));

    app.use(cookieParser());                          
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(session({                               
        secret: '123456',
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());

    app.use((req, res, next) => {
        if (req.user) {
            res.locals.currentUser = req.user;    //we create a res.locals variable (currentUser), which comes from express and is available everywhere, we can call it passing through handlebars in the template.
        }
        next();
    });

    app.set('view engine', '.hbs');

    app.use(express.static(path.join(__dirname, '../static/public')));
};