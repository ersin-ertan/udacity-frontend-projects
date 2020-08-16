// API class that allows for dynamic API selection and an easier API interface for clean code

module.exports = class API {

    constructor(name, baseUrl) {
        this.name = name
        this.baseUrl = baseUrl
        this.apiKey = process.env[name]
    }

    get fullUrl() {

        let fullUrl = ""

        if (this.name == "weatherbit") {
            fullUrl = this.baseUrl + "?"
            for (let key in this.queryDict) {
                fullUrl += key + "=" + this.queryDict[key] + "&"
            }
            fullUrl += "key=" + this.apiKey
        }
        else if (this.name == "pixabay") {
            fullUrl = this.baseUrl + "?key=" + this.apiKey + "&"
            for (let key in this.queryDict) {
                fullUrl += key + "=" + this.queryDict[key] + "&"
            }
            fullUrl += "image_type=photo&category=places&safesearch=true"
        }

        console.log(fullUrl)
        return fullUrl
    }
};