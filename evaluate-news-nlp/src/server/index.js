const dotenv = require("dotenv")
dotenv.config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser');
const { check, validationResult, matchedData } = require('express-validator');
var api = ""
try {
    var AylienNewsApi = require("aylien-news-api");
    var defaultClient = AylienNewsApi.ApiClient.instance;
    var app_id = defaultClient.authentications["app_id"];
    app_id.apiKey = process.env["NEWSAPI_APP_ID"];
    var app_key = defaultClient.authentications["app_key"];
    app_key.apiKey = process.env["NEWSAPI_APP_KEY"];

    api = new AylienNewsApi.DefaultApi();

    var opts = {
        title: "trump",
        sortBy: "social_shares_count.facebook",
        notLanguage: ["en"],
        publishedAtStart: "NOW-7DAYS",
        publishedAtEnd: "NOW",
        entitiesBodyLinksDbpedia: [
            "http://dbpedia.org/resource/Donald_Trump",
            "http://dbpedia.org/resource/Hillary_Rodham_Clinton"
        ]
    };
} catch (error) {
    console.log("Aie")
    api = require('./AylienNewsApi.js')()
}
const fetch = require('node-fetch');
const mockAPIResponse = require('./mockAPI.js')


// console.log("API_ID:\t\t" + process.env.API_ID + "\nAPI_KEY:\t" + process.env.API_KEY)
// var textapi = new aylien({
//     application_id: process.env.API_ID,
//     application_key: process.env.API_KEY
// });

expressInit()

function expressInit() {

    const app = express()
    app.use(express.static('dist'))
    app.use(bodyParser.urlencoded({ extended: true }))
    console.log(__dirname)

    app.listen(8080, listenPort())
    app.get('/', getRoot)
    app.post('/test',
        [check('input').isLength({ min: 1 }).withMessage("input is required")],
        postTest)
}

function getRoot(req, res) {
    // res.sendFile('dist/index.html') // I enabled this one as part of lesson 12.Plugins, I disabled this because TypeError: path must be absolute or specify root to res.sendFile
    res.sendFile(path.resolve('src/client/views/index.html'))
}

function listenPort() {
    console.log('Example app listening on port 8080!')
}

function postTest(req, res) {
    console.log("req")
    console.log(req)
    // res.send(mockAPIResponse)


    const errors = validationResult(req)
    console.log("validationResult(req)")
    console.log(errors)

    if (!errors.isEmpty()) {
        console.log("422")
        return res.status(422).json({ errors: errors.array() })
    } else {
        const input = matchedData(req).input
        console.log("matchedData(req).input")
        console.log(input)

        var callback = function (error, data, response) {
            if (error) {
                console.error(error);
                return res.status(500).send(error)

            } else {
                console.log("API called successfully. Returned data: ");
                console.log("========================================");
                for (var i = 0; i < data.stories.length; i++) {
                    console.log(data.stories[i].title + " / " + data.stories[i].source.name);
                }
                return res.send(data)
            }
        };

        api.listStories(opts, callback);
    }
}

const test2 = { t: true }

module.exports = test2