/**
 * Set object by id.
 * @params (string) selector
 * @params (object) object
 */
const setObjectById = (selector, object) => {
    let element = document.getElementById(selector);
    if (element != null) new object(element);
}

/**
 * Set object by query.
 * @params (string) selector
 * @params (object) object
 */
const setObjectByQuery = (selector, object) => {
    let element = document.querySelectorAll(selector);
    for (let i = 0; i < element.length; i++) {
        new object(element[i]);
    }
}

export {
    setObjectById,
    setObjectByQuery,
}