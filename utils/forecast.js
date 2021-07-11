const request = require('request');

const forecast = async (err, data, callback) => {
    console.log("data:", data)
    let description;
    const url = `http://api.weatherstack.com/current?access_key=501893978696d830e4314f819ab90df5&query=${data.coord[1]},${data.coord[0]}&units=m`;
    request({
        url,
        json: true
    }, (error, response) => {
        if (error) {
            description = "Couldn't connect to weather service!";
        } else if (response.body.error) {
            description = "provide valid location coordinates";
        } else {
            const body = response.body;
            
            description = body.current.weather_descriptions[0] + '.The current temperature is ' + body.current.temperature + ' but it feels like ' + body.current.feelslike;
            callback('', description);
        }
    });
};

module.exports = forecast