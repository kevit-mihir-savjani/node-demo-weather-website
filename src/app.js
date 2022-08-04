const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const app = express();
const port = process.env.PORT || 3000;
//define path for epress config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup handlebar engine and view location
app.set('view engine', 'hbs')
app.set("views", viewsPath)
hbs.registerPartials(partialsPath);

//setup directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', { title: "Weather", name: "ms", desc: "End of index file" });
})
app.get('/about', (req, res) => {
    res.render('about', { title: "Anime", name: "Dragon Ball Super", desc: "End of about file" });
})
app.get('/help', (req, res) => {
    res.render('help', { title: "Help Page", text: "For any query mail us at abc@gmail.com", desc: "End of help file" });
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({ forecast: "It is raining", location: 'US', address: req.query.address });
})
app.get('/products', (req, res) => {
    console.log(req.query.search)
    res.send({ products: [] });
})
app.get('/help/*', (req, res) => {
    res.render('404', { title: "404", errorMessage: "Help subpage Page Not Found" })
})
app.get('*', (req, res) => {
    res.render('404', { title: "404", errorMessage: "Page Not Found" })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port);
})
