
const { checkForName } = require("./nameChecker");

test("check for name from existing list", () => {
    expect(checkForName("Picard")).toBe("Welcome, Captain Picard")
});