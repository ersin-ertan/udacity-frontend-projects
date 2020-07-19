
const json = require("./mockAPI")

test("get json for test", () => {
    expect(json.title).toBe("test json response")
});