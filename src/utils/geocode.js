const request = require("request");

const geocode = (address, callback) => {
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWloaXJzYXZqYW5pIiwiYSI6ImNsNjRuejNlajBwZDgzZHA0MzFzaGkwNWQifQ.K_rR9TX_9iFIvZJ74f621Q& limit=1';
    request({ url: url2, json: true }, (error, response) => {
        // console.log(response.body.features[0]);
        if (error) {
            callback("unable to connect to location services", undefined);
        }
        else if (response.body.features.length == 0) {
            callback("unable to find the location. please search another one", undefined)
        }
        else {
            callback(undefined, {
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
}
module.exports = geocode;