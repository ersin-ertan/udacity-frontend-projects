
const { handleSubmit, getText } = require("./formHandler")

test("get text from function", () => {
    expect(getText()).toBe("Finished")
});