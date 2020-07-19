import { checkForName } from './js/nameChecker'
import { handleSubmit, getText } from './js/formHandler'
import './styles/resets.scss'
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'

window.addEventListener('DOMContentLoaded', (event) => {

    const form = document.getElementById("form")
    form.addEventListener("submit", (e) => {
        handleSubmit()
        console.log(getText())
    })
});

const test1 = { t: false }

modules.export = test1
