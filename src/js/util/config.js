/**
 * Set component object by id.
 * @params (string) componentSelector
 * @params (object) componentObject
 */
const setComponentObjectById = (componentSelector, componentObject) => {
    let element = document.getElementById(componentSelector);
    if (element != null) new componentObject(element);
}

/**
 * Set component object by query.
 * @params (string) componentSelector
 * @params (object) componentObject
 */
const setComponentObjectByQuery = (componentSelector, componentObject) => {
    let element = document.querySelectorAll(componentSelector);

    for (let i = 0; i < element.length; i++) {
        if(element[i].getAttribute("id") != null) new componentObject(element[i]);
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
    setComponentObjectById,
    setComponentObjectByQuery,
    toggleTransition,
    toggleAllTransition,
}