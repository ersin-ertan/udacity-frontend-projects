import './styles/style.scss'
import { initDatePickers, toTop } from "./js/app"

window.addEventListener('DOMContentLoaded', (event) => {

    const dateStart = document.getElementById("date-start")
    const dateEnd = document.getElementById("date-end")
    initDatePickers(dateStart, dateEnd)

    const location = document.getElementById("location")
    location.addEventListener('keyup', ({ key }) => {
        if (key === "Enter") {
            const loc = location.value
            console.log(loc)
            if (loc.trim() != "") {
                const start = document.getElementById("date-start").value
                const end = document.getElementById("date-end").value
                searchForLocation(loc.trim(), start, end)
            }
            return false
        }
    })

    const toTopButton = document.getElementById("toTop")
    toTopButton.addEventListener("click", toTop)

});

export function test1(a, b) {
    return a + b
}


async function searchForLocation(location, start, end) {

    const fetchOptions = {
        method: 'GET',
        // mode: 'no-cors',
        credentials: 'same-origin',
        // headers: { 'Content-Type': 'x-www-form-urlencoded', },
        // body: new URLSearchParams("loc=" + location)
    }

    const res = await fetch('http://localhost:8081/loc' +
        "?loc=" + location +
        "&start=" + start +
        "&end=" + end, fetchOptions)
    try {
        const data = await res.json();
        console.log(data);
        const weather = data.weather
        const locPicUrl = data.locPicUrl
        const locPicTags = data.locPicTags
        console.log(weather)
        console.log(locPicTags)
        console.log(locPicUrl)
        document.getElementById("image-location").src = locPicUrl
        document.getElementById("figcap").innerHTML = "Weather: " + weather + "C, Tags: " + locPicTags
        return true
    } catch (error) {
        console.log(error);
        return false
    }

}