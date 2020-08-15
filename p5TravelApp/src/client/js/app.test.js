import { initDatePickers } from "./app.js"

test("date pickers are init properly", () => {

    const dp = document.createElement("datePicker")
    dp.type = "date"

    initDatePickers(dp, dp)

    const today = new Date().toISOString().split("T")[0];
    console.log(today)
    console.log(dp.value)

    expect(dp.value).toBe(today)
});