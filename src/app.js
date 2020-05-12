const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/weather')


console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Adrian Windisch'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Adrian Windisch'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'Call 911 lol ',
        title: 'Help',
        name: 'Adrian Windisch'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You have to enter an address'
        })
    }
    console.log(req.query)
    geocode(req.query.address, (err, {latitude, longitude, location} = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        } else {
            forecast(latitude, longitude, (err, {summary, temperature, precipitations}) => {
                if (err) {
                    return res.send({
                        error: err
                    })
                } else {
                    res.send({
                        address: req.query.address,
                        location,
                        forecast: summary + ' The temperature is ' + temperature + ' degrees and the precipitations are ' + precipitations + '%'
                    })
                }
            })
        }
    })

    
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})