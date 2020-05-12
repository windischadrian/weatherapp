const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/777a19d7092952bc57be1ea23a97adf8/' + latitude + ',' + longitude +'?units=si';

    request({url, json: true}, (err, { body }) => {
        if (err) {
            callback('Unable to connect to server!', undefined);
        } else if (body.error) {
            callback('Unable to find location!');
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipitations: body.currently.precipProbability
            });
        }
    })
}

module.exports = forecast