const dotenv = require("dotenv").config()
const API = require("./api.js");
import regeneratorRuntime from "regenerator-runtime";

test("weather api returns correct full api string", () => {

    const weatherUrl = "https://api.weatherbit.io/v2.0/current"
    const weatherApi = new API("weatherbit", weatherUrl)
    weatherApi.queryDict = { "a": "b" }

    expect(weatherApi.fullUrl).toBe(weatherUrl + "?a=b&key=" + process.env[weatherApi.name])

    const pixabayUrl = "https://pixabay.com/api/";
    const pixApi = new API("pixabay", pixabayUrl)
    pixApi.queryDict = { "q": "london" }

    expect(pixApi.fullUrl).toBe(pixabayUrl + "?key=" + process.env[pixApi.name] + "&q=london&image_type=photo&category=places&safesearch=true")
});