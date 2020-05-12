const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2h1Y2tlciIsImEiOiJjanhlMTc0cWMwZ2NtM3Buemc1cW10cmN6In0.eC3UUdFHPpe7lhnbz3G5rg&limit=1';

    request({url: url, json: true}, (err, { body }) => {
        if (err) {
            callback('Unable to connect to location servicies!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode;