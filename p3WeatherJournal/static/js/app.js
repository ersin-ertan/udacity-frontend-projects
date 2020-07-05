// app.js

let apiKey = ""
const owmEndpoint = "https://api.openweathermap.org/data/2.5/weather" //?zip=" + zip + ",us&appid="

window.addEventListener('DOMContentLoaded', (event) => {

    getApiKey()
    addEntryHolder()

    // Adds an event listener to an existing HTML button from DOM using Vanilla JS.
    // In the file app.js, the element with the id of generate should have an addEventListener() method called on it, with click as the first parameter, and a named callback function as the second parameter.
    document.getElementById("generate").addEventListener("click", getZipWeather, false)

});

async function getApiKey() {
    fetch("http://localhost:8000/apiKey").then(resp => {
        resp.json().then(data => {
            apiKey = data.apiKey
            console.log("Received apiKey: " + apiKey)
        })
    })
}

// The client side function should take two arguments, the URL to make a POST to, and an object holding the data to POST.
async function post(data) {

    const date = new Date()
    const temp = data.main.temp
    const feelings = document.getElementById("feelings").value
    const postButton = document.getElementById("generate")

    postButton.innerText = "Generating"
    console.log("Posting: %s, %s, %s", date, temp, feelings)
    try {
        const response = await fetch("http://localhost:8000/post", {
            method: 'POST',
            credentials: 'same-origin',
            headers: { 'Content-Type': 'application/json', },
            // Body data type must match "Content-Type" header        
            body: JSON.stringify({ date, temp, feelings }),
        });
        const newData = await response.json()
        postButton.innerText = "Generate Success"
        console.log(newData)

        getData()

    } catch (error) {
        postButton.innerText = "Generate Failed"
        console.log("error", error)
    }
}

function getData() {
    fetch("http://localhost:8000/getData").then(resp => {
        resp.json().then(data => {
            console.log(data)
            const serverData = data.getData[data.getData.length - 1]
            console.log("Received serverData: " + JSON.stringify(serverData))
            document.getElementById("date").innerHTML = "Date: " + serverData.date
            document.getElementById("temp").innerHTML = "Temp: " + serverData.temp
        })
    })
}

async function getZipWeather() {

    zip = document.getElementById("zip").value
    console.log("zip:" + zip)

    if (typeof zip != "number" && zip.length == 5) {

        let url = owmEndpoint + "?" + new URLSearchParams({ zip }) + ",us&appid=" + apiKey // The API Key variable is passed as a parameter to fetch() .
        console.log(url)
        try {
            let resp = await fetch(url)
            const json = await resp.json() // Data is successfully returned from the external API.
            console.log(json)
            console.log("fetch data: " + JSON.stringify(json))
            // Included in the async function to retrieve that app’s data on the client side, existing DOM elements should have their innerHTML properties dynamically set according to data returned by the app route.
            if (json.cod == 404) throw Error("city not found")
            post(json)

        } catch (error) {
            console.log("fetch error: " + error)
            alert(error)

        }
    }
    else { alert("input error for GET weather client query, zip value of: " + zip) }
}

function createElementWithId(tag, id) {
    const e = document.createElement(tag)
    e.id = id
    return e
}

function appendChildren(element, ...children) {
    children.forEach(c => {
        element.appendChild(c)
    })
}

function addEntryHolder() {

    const entryHolder = createElementWithId("DIV", "entryHolder")
    const date = createElementWithId("DIV", "date")
    const temp = createElementWithId("DIV", "temp")
    const content = createElementWithId("DIV", "content")

    appendChildren(entryHolder, date, temp, content)
    document.body.appendChild(entryHolder)
}