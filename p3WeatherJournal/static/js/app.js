// app.js

window.addEventListener('DOMContentLoaded', (event) => {

    addEntryHolder()

    // Adds an event listener to an existing HTML button from DOM using Vanilla JS.
    // In the file app.js, the element with the id of generate should have an addEventListener() method called on it, with click as the first parameter, and a named callback function as the second parameter.
    document.getElementById("generate").addEventListener("click", getZipWeather)
    const button = createElementWithId("button", "post")
    button.innerText = "POST"
    button.addEventListener("click", function () {
        console.log("click")
        post({ time: Date() })
    })
    document.body.appendChild(button)
});

// The client side function should take two arguments, the URL to make a POST to, and an object holding the data to POST.
async function post(data) {
    const response = await fetch("http://localhost:8000/post", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json()
        console.log(newData)
        return newData
    } catch (error) {
        console.log("error", error)
    }
}

function getZipWeather() {

    // document.getElementById("zip").value
    // zip = "47722"
    // if (parseInt(zip) != NaN && zip.length == 5) {
    //     console.log("zip: " + zip);
    //     let url = "http://localhost:8000/weather?" + new URLSearchParams({ zip })
    //     fetch(url).then(resp => { // There should be an asynchronous function to fetch the data from the app endpoint
    //         resp.json().then(data => {
    //             console.log()
    //             console.log("fetch: " + JSON.stringify(data))
    //             // Included in the async function to retrieve that app’s data on the client side, existing DOM elements should have their innerHTML properties dynamically set according to data returned by the app route.
    //             document.getElementById("temp").innerHTML = "Temp: " + data.main.temp
    // document.getElementById("date").innerHTML = "Date: " + new Date()

    //         }).catch(error => {
    //             alert("Parse error: " + error)
    //         });

    //     }).catch(error => {
    //         alert("fetch error: " + error)
    //     })
    // }
    // else {
    //     alert("default GET zip client query value")
    // }
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