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
 * @params (string) selector
 * @params (object) object
 * @return (array) objectInstances
 */
const setComponentByQuery = (selector, object) => {
    let objectInstances = []
    let element = document.querySelectorAll(selector);

    for (let i = 0; i < element.length; i++) {
        if(element[i].getAttribute("id") != null) objectInstances.push(new object(element[i]));
    }

    return objectInstances;
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
    setComponentByQuery,
    toggleTransition,
    toggleAllTransition,
}