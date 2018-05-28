const express = require('express');
const hbs = require('hbs');

const APP = express();

APP.set('view enging', 'hbs');
APP.use(express.static(__dirname + '/public'))

APP.get('/', (req, res) => {
    // res.send('<h1>Hello Express!<?h1>');
    res.send({
        name: 'Tim',
        likes: [
            'music',
            'food'
        ]
    })
});

APP.get('/about', (req, res) => {
   res.render('about.hbs', {
       pageTitle: 'About Page',
       currentYear: new Date().getFullYear()
   });
});

APP.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to connect'
    }); 
 })

APP.listen(3000, () => {
    console.log('Server is up on port 3000');
});