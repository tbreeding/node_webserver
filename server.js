const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const PORT = process.env.PORT || 3000;
const APP = express();

hbs.registerPartials(__dirname + '/views/partials');
APP.set('view enging', 'hbs');

APP.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('sever.log', log + '\n', (err) => {
        if(err) console.log('Unable to append to server.log');
    });
    next();
});

// APP.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

APP.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

APP.get('/', (req, res) => {
    // res.send('<h1>Hello Express!<?h1>');
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to this website'
    });
});

APP.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page'
   });
});

APP.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to connect'
    }); 
 });

APP.listen(PORT, () => {
    console.log(`Server is up on port ${PORT}`);
});