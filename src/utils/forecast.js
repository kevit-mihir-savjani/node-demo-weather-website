const request = require("request");

const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=ba27888e00fd4b5def5310799e3fc851&query=" + longitude + "," + latitude + "&units=f";
    request({ url: url, json: true }, (error, response) => {
        // console.log(response.body.current.weather_descriptions[0]);
        if (error) {
            callback('unable to connect to the weather service', undefined);
        }
        else if (response.body.error) {
            callback('unable to find location', undefined);
        }
        else {
            // console.log(response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out .It feels like " + response.body.current.feelslike + " degrees out.");
            callback(undefined,
                response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degrees out .It feels like " + response.body.current.feelslike + " degrees out."
            )
        }
    });
}
module.exports = forecast;