const express = require('express');
const { readFile } = require('fs');
const https = require('https');
const { stringify } = require('querystring');


const app = express();
const url = 'https://api.openweathermap.org/data/2.5/weather';
const params = '?lat=33.749001&lon=-84.387978&units=imperial&appid=4672b3adf07c264212ec0dde7ecc0bf5'



app.get('/', (req, res) => {

    https.get(url + params, (message) => {
        message.on('data', (data) => {
            const wd = JSON.parse(data);
            var weather = wd.weather[0]
            var img_url = 'https://openweathermap.org/img/wn/' + weather.icon + '@2x.png'

            res.write(
                '<h1>' + wd.name + ' is currently ' + wd.main.temp + ' degrees with ' + wd.main.humidity + '% humidity. </h1>'
            )
            res.write('<p>' + weather.main + '</p>')
            res.write('<img src="' + img_url + '"/>')
            res.write('<p>' + weather.description + '</p>')

            res.send()
        });
    });
});


app.listen(3000, () => { console.log('Running on Port 3000!') })