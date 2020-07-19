import { json } from "body-parser"

async function handleSubmit() {
    console.log("handleSubmit")

    event.preventDefault()

    let formText = document.getElementById('name').value
    console.log("formText")
    console.log(formText)


    const fetchOptions = {
        method: 'POST',
        credentials: 'same-origin',
        // headers: { 'Content-Type': 'x-www-form-urlencoded', },
        body: new URLSearchParams("input=" + formText)
    }
    const fetchRes = await fetch('http://localhost:8080/test', fetchOptions)
    console.log("fetchRes")
    console.log(fetchRes)

    console.log("fetchRes.status")
    console.log(fetchRes.status)
    switch (fetchRes.status) {
        case 404: {
            alert("404 error")
            break;
        }
        case 200: {

            const jsonRes = await fetchRes.json()
            console.log("jsonRes")
            // console.log(jsonRes)

            var results = document.getElementById('results')
            var string = ""
            for (var i = 0; i < jsonRes.stories.length; i++) {
                string += "\n" + jsonRes.stories[i].title + " / " + jsonRes.stories[i].source.name
            }
            console.log(string)
            results.innerText = string

            break;
        }
        case 500: {
            break;
        }
        case 400: {
            break;
        }
        case 422: {
            const jsonRes = await fetchRes.json()
            console.log("jsonRes")
            console.log(jsonRes)

            const errors = jsonRes.errors[0]
            console.log("errors")
            console.log(errors)

            alert("You passed value: " + errors.value + "\nThe error was: " + errors.msg)
            break;
        }
        default: {

            break;
        }
    }
}

function getText() {
    return "Finished"
}

export { handleSubmit, getText }