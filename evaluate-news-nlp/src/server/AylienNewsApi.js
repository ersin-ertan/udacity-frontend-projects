function AylienNewsApi() {
    return {
        listStories: function (opts, callback) {
            const data = { stories: [{ title: "Trump proclaimed on Twitter...", source: { name: "Fox News" } }, { title: "New hack took over...", source: { name: "ABC" } }] }
            callback(false, data)
        }
    }
}
module.exports = AylienNewsApi