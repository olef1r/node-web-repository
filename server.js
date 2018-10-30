const express = require('express');
const hbs = require('hbs')
const fs = require('fs');
let app = express();

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', e => {
        if (e) console.log('Unable to append to server log')
    });
    next();
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear()
});

hbs.registerHelper('screanIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('hello.hbs', {
        pageTitle: 'Hello Page',
        currentYear: new Date().getFullYear(),
        message: 'Hello App'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs',{
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
});

app.listen(8080, () => {
    console.log('Server is up on port 3000')
});