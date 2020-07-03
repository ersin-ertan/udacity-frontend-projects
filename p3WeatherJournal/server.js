// test

const [express, cors, bodyParser, fetch] = ["express", "cors", "body-parser", "node-fetch"].map(require)
const openWeatherMapApiKey = process.env.OWMPAK // Create API credentials on OpenWeatherMap.com
// The personal API Key for OpenWeatherMap API is saved in a named const variable.
const app = express() // Node and Express should be installed on the local machine. The project file server.js should require express(), and should create an instance of their app using express.
const PORT = 8000
let projectData = {} // There should be a JavaScript Object named projectData initiated in the file server.jsto act as the app API endpoint.
const owmEndpoint = "https://api.openweathermap.org/data/2.5/weather" //?zip=" + zip + ",us&appid="

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) // The body-parser package should be installed and included in the project.
app.use(cors()) // The ‘cors’ package should be installed in the project from the command line, required in the project file server.js, and the instance of the app should be setup to use cors().
app.use(express.static("static")) // The Express app instance should be pointed to the project folder with .html, .css, and .js files.
app.use(express.json())


const server = app.listen(PORT, () => {
    console.log("listening...👂")
    console.log(openWeatherMapApiKey)
})

// There should be a GET route setup on the server side with the first argument as a string naming the route, and the second argument a callback function to return the JS object created at the top of server code.
app.get('/weather', async function (req, res) {
    const zip = req.query.zip
    if (zip != null) {
        console.log(zip)
        let url = owmEndpoint + "?" + new URLSearchParams({ zip }) + ",us&appid=" + openWeatherMapApiKey // The API Key variable is passed as a parameter to fetch() .
        console.log(url)
        try {
            let resp = await fetch(url)
            projectData = await resp.json() // Data is successfully returned from the external API.
            console.log(projectData)
            console.log("---")
            console.log("fetch: " + JSON.stringify(projectData))
            // Included in the async function to retrieve that app’s data on the client side, existing DOM elements should have their innerHTML properties dynamically set according to data returned by the app route.
            res.json(projectData);
        } catch (error) {
            console.log("fetch error: " + error)
            // res.status(500).send({ "e": "e" })
            res.status(500).send(new Error("Server Error: " + error))
        }


        // The API Key variable is passed as a parameter to fetch() .
    } else {
        res.status(404).send({ "Request Error": "Empty query param zip=" + zip });
    }
})

// You should be able to add an entry to the project endpoint using a POST route setup on the server side and executed on the client side as an asynchronous function.
// The server side function should create a new entry in the apps endpoint (the named JS object) consisting of the data received from the client side POST.
const data = []
app.post('/post', async function (req, res) {
    data.push(req.body)
    console.log("Data: " + JSON.stringify(data))
})