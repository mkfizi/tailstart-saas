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

export {
    initializeObjectById,
    initializeObjectByQuery
}