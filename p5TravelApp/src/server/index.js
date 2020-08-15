const dotenv = require("dotenv").config()
const path = require("path")
const express = require("express")
const bodyParser = require("body-parser")
const Geonames = require('geonames.js')
const cors = require("cors")
const fetch = require('node-fetch');
const API = require("API")

const pixApi = new API("pixabay", "https://pixabay.com/api/")

const geonames = new Geonames({
    username: 'ersin_e',
    lan: 'en',
    encoding: 'JSON'
});

let projectData = {};

const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use(express.static('dist')); // website or dist?

app.get('/', function (req, res) { res.sendFile('dist/index.html') })

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

function initWeatherApi(start, end) {

    const numWeeks = 1;
    let now = new Date();
    now.setDate(now.getDate() + numWeeks * 7);
    const inOneWeek = now.toISOString().split("T")[0];
    if (start < inOneWeek) {
        return new API("weatherbit", "https://api.weatherbit.io/v2.0/current")
    } else {
        return new API("weatherbit", "https://api.weatherbit.io/v2.0/forecast/daily")
    }
}

app.get('/loc', async function (req, res) {
    const location = req.query.loc
    const end = req.query.end
    const start = req.query.start


    console.log(location)
    console.log(start)
    console.log(end)

    const weatherApi = initWeatherApi(start, end)

    // res.setHeader('Content-Type', 'application/json')
    try {
        const search = await geonames.search({ q: location, style: "SHORT", maxRows: 1 }) //get continents
        // console.log(search);
        // const searchRes = await res.json(londonTestSearch)
        // const searchRes = londonTestSearch
        try {
            weatherApi.queryDict = { "lat": search.geonames[0].lat, "lon": search.geonames[0].lng }
            const weatherReq = await fetch(weatherApi.fullUrl)
            // const weatherRes = await weatherReq.json()
            // console.log(weatherRes)
            // return res.json(weatherRes)
            pixApi.queryDict = { "q": location }
            const pixReq = await fetch(pixApi.fullUrl)

            const [weatherJson, pixJson] = await Promise.all([weatherReq.json(), pixReq.json()])
            return res.json({ weather: weatherJson.data[0].temp, locPicUrl: pixJson.hits[0].webformatURL, locPicTags: pixJson.hits[0].tags })
            // return res.json(weatherTestData)
        } catch (err) {
            console.error(err)
        }
    } catch (err) {
        console.error(err);
    }
})

const londonTestSearch = {
    totalResultsCount: 7819,
    geonames: [
        {
            lng: '-0.12574',
            geonameId: 2643743,
            countryCode: 'GB',
            name: 'London',
            toponymName: 'London',
            lat: '51.50853',
            fcl: 'P',
            fcode: 'PPLC'
        }
    ]
}

const weatherTestData = {
    data: [
        {
            rh: 81.2,
            pod: 'n',
            lon: 0,
            pres: 1013.3,
            timezone: 'Africa/Accra',
            ob_time: '2020-08-13 23:55',
            country_code: 'GH',
            clouds: 30,
            ts: 1597362905,
            solar_rad: 0,
            state_code: '09',
            city_name: 'Takoradi',
            wind_spd: 4.77555,
            wind_cdir_full: 'south-southeast',
            wind_cdir: 'SSE',
            slp: 1013.33,
            vis: 24,
            h_angle: -90,
            sunset: '18:08',
            dni: 0,
            dewpt: 21.6,
            snow: 0,
            uv: 0,
            precip: 0,
            wind_dir: 165,
            sunrise: '06:00',
            ghi: 0,
            dhi: 0,
            aqi: 71,
            lat: 0,
            weather: [Object],
            datetime: '2020-08-13:23',
            temp: 24.9,
            station: 'D7059',
            elev_angle: -75.66,
            app_temp: 25.6
        }
    ],
    count: 1
}

