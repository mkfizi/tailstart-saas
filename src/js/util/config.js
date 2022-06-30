const initializeObjectById = (selector, object) => {
    let element = document.getElementById(selector);
    if (element != null) new object(element);
}

const initializeObjectByQuery = (selector, object) => {
    let element = document.querySelectorAll(selector);
    for (let i = 0; i < element.length; i++) {
        new object(element[i]);
    }
}

/**
* Handle viewport issues for mobile browsers.
* # Refer https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
*/
const handleViewport = () => {
    const viewportHeight = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", viewportHeight + "px");
}

/**
 * Set footer current year.
 */
const setFooterCurrentYear = () => {
    const element = document.getElementById("footerCurrentYear");
    element.innerHTML = new Date().getFullYear();
}

export {
    initializeObjectById,
    initializeObjectByQuery,
    handleViewport,
    setFooterCurrentYear,
}