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

/**
 * Toggle "transition-none" class to target element.
 * @params (HTMLDom) element
 */
const toggleTransition = element => {
    element.classList.add("transition-none");
    setTimeout(() => { element.classList.remove("transition-none"); }, 1000);       
}

/**
 * Toggle "transition-none" class to all elements with transition classes.
 */
const toggleAllTransition = () => {
    let transitions = document.querySelectorAll(".transition, .transition-all, .transition-colors, .transition-opacity, .transition-shadow, .transition-transform");
    for (let i = 0; i < transitions.length; i++) {
        transitions[i].classList.add("transition-none");
        setTimeout(() => { transitions[i].classList.remove("transition-none"); }, 1000);
    }
}

export {
    setObjectById,
    setObjectByQuery,
    toggleTransition,
    toggleAllTransition,
}