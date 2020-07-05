const [express, cors, bodyParser, fetch] = ["express", "cors", "body-parser", "node-fetch"].map(require)
// The body-parser package should be installed and included in the project.
const openWeatherMapApiKey = process.env.OWMPAK // Create API credentials on OpenWeatherMap.com
// The personal API Key for OpenWeatherMap API is saved in a named const variable.
const PORT = 8000
let projectData = {
    postData: [""],
} // There should be a JavaScript Object named projectData initiated in the file server.js to act as the app API endpoint.
const owmEndpoint = "https://api.openweathermap.org/data/2.5/weather" //?zip=" + zip + ",us&appid="

initServer()

function initServer(port = PORT, apiKey = openWeatherMapApiKey,) {

    app = express() // Node and Express should be installed on the local machine. The project file server.js should require express(), and should create an instance of their app using express.
    app.use(express.static("static")) // The Express app instance should be pointed to the project folder with .html, .css, and .js files.
    app.use(express.json())

    app.use(bodyParser.urlencoded({ extended: false })) // not required if using express
    app.use(bodyParser.json())

    app.use(cors()) // The ‘cors’ package should be installed in the project from the command line, required in the project file server.js, and the instance of the app should be setup to use cors().

    app.listen(port, () => {
        console.log("\n--- Server Init Start ---")
        console.log("App is listening: " + "http://localhost:" + port)
        console.log("Apikey: " + apiKey)
        console.log("--- Server Init End ---\n")
    })

    initGetApiKey(apiKey)
    initGetData()
    initPost(app)

}

function initGetData() {

    app.get('/getData', async function (req, res) {
        console.log("--- Get getData Call Start ---")
        console.log("sending projectData.getData: " + JSON.stringify(projectData.postData))
        res.status(200).send({ getData: projectData.postData })
        console.log("--- Get getData Call End ---\n")
    })
}

function initGetApiKey(apiKey) {

    app.get('/apiKey', async function (req, res) {
        console.log("--- Get ApiKey Call Start ---")
        res.status(200).send({ apiKey })
        console.log("--- Get ApiKey Call End ---\n")
    })
}

function initPost(app) {

    app.post('/post', async function (req, res) {
        console.log("--- Post Call Start ---")
        console.log("/post call with req.body: " + JSON.stringify(req.body))
        console.log("current value of projectData.postData: " + JSON.stringify(projectData.postData))
        const { date, temp, feelings } = req.body
        projectData.postData.push({ date, temp, feelings })
        console.log("new value of projectData.postData: " + JSON.stringify(projectData.postData))
        res.status(200).send({ success: "true" })
        console.log("--- Post Call End ---\n")
    })
}
// You should be able to add an entry to the project endpoint using a POST route setup on the server side and executed on the client side as an asynchronous function.
// The server side function should create a new entry in the apps endpoint (the named JS object) consisting of the data received from the client side POST.
