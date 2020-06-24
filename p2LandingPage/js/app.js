window.addEventListener('DOMContentLoaded', (event) => {

    const menuItems = ["red", "blue", "orange", "yellow"]
    const menu = createMenu()

    menuItems.forEach((item) => {

        const menuItem = document.createElement("LI")

        menuItem.setAttribute("id", item)
        menuItem.setAttribute("class", "menuItem")
        menuItem.style.color = "white"
        menuItem.textContent = item
        menuItem.style.marginRight = "3px"
        menuItem.style.marginLeft = "3px"

        menu.appendChild(menuItem)
    })

    document.body.appendChild(menu)

    const docFrag = document.createDocumentFragment()

    menuItems.forEach((item) => {

        const section = document.createElement("DIV")

        section.setAttribute("id", "section-" + item)
        section.setAttribute("class", "section")
        section.style.width = window.innerWidth + "px"
        section.style.height = window.innerHeight + "px"
        section.style.backgroundColor = item

        docFrag.appendChild(section)
    })

    document.body.appendChild(docFrag)

    window.addEventListener('resize', function (event) {
        [...document.getElementsByClassName("section")].forEach((section) => {
            section.style.height = window.innerHeight + "px"
            section.style.width = window.innerWidth + "px"
        })
    });

    window.addEventListener('scroll', function (event) {
        [...document.getElementsByClassName("section")].forEach((section) => {
            document.getElementById(section.id.split("section-")[1])
                .style.fontSize = 1 + getPercentOfView(section) / 100 + "em"
        })
    });
});

function createMenu() {

    const menu = document.createElement("UL")

    menu.setAttribute("id", "menu")
    const menuStyle = menu.style
    menuStyle.backgroundColor = "grey"
    menuStyle.display = "flex"
    menuStyle.flexWrap = "wrap"
    menuStyle.justifyContent = "center"
    menuStyle.position = "sticky"
    menuStyle.top = 0;
    menuStyle.alignItems = "center"
    menuStyle.listStyleType = "none"
    menuStyle.minWidth = "70px"
    menuStyle.minHeight = "100px"

    menu.addEventListener("click", function (event) {
        if (event.target.nodeName === "LI") {
            event.preventDefault()
            window.scrollTo({
                top: document.getElementById("section-" + event.target.id).offsetTop,
                left: 0,
                behavior: 'smooth'
            });
        }
    }, true)

    return menu;
}

// https://stackoverflow.com/a/60455358
function getPercentOfView(element) {
    const viewTop = window.pageYOffset;
    const viewBottom = viewTop + window.innerHeight;
    const rect = element.getBoundingClientRect();
    const elementTop = rect.top + viewTop;
    const elementBottom = elementTop + rect.height;

    if (elementTop >= viewBottom || elementBottom <= viewTop) {
        // heigher or lower than viewport
        return 0;
    } else if (elementTop <= viewTop && elementBottom >= viewBottom) {
        // element is completely in viewport and bigger than viewport
        return 100;
    } else if (elementBottom <= viewBottom) {
        if (elementTop < viewTop) {
            // intersects viewport top
            return Math.round((elementBottom - viewTop) / window.innerHeight * 100);
        } else {
            // completely inside viewport
            return Math.round((elementBottom - elementTop) / window.innerHeight * 100);;
        }
    } else {
        // intersects viewport bottom
        //  elementBottom >= viewBottom && elementTop <= viewBottom
        return Math.round((viewBottom - elementTop) / window.innerHeight * 100);
    }
}