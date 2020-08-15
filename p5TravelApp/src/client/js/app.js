// import "../styles/styles.scss"
// import { Something } from "./something"

export function toTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log("scrolling to top")
}

export function initDatePickers(dateStart, dateEnd) {

    const date = new Date().toISOString()
    const today = date.split("T")[0];

    dateStart.value = today
    dateEnd.value = today
    dateStart.min = today
    dateEnd.min = today

    const tl = document.getElementById("trip-length")

    dateStart.onchange = function (e) {

        if (e.target.value < today) {
            e.target.value = dateStart.min
        }

        if (e.target.value > dateEnd.value) {
            dateEnd.value = e.target.value
            dateEnd.min = e.target.value
        }

        dateEnd.min = e.target.value

        console.log(dateStart.value)
        console.log(dateEnd.value)
        const l = calcLength(dateStart.value, dateEnd.value)
        tl.innerHTML = "Length: " + l
    }

    dateEnd.onchange = function (e) {
        if (e.target.value < dateStart.value) {
            e.target.value = dateStart.value
        }

        const l = calcLength(dateStart.value, dateEnd.value)
        tl.innerHTML = "Length: " + l
    }
}

function calcLength(dateStart, dateEnd) {
    const s = dateStart.split("-")
    const e = dateEnd.split("-")
    const l = (e[0] - s[0]) + " Year(s), " + (e[1] - s[1]) + " Month(s), " + (e[2] - s[2]) + " Day(s)!"
    console.log(l)
    return l
}