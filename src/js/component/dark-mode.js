import {setComponentObjectByQuery} from "../util/config.js";
import {toggleAllTransition} from "../util/config.js";

class DarkMode {
    element = null; // Dark mode element

    /**
     * Dark mode constructor.
     * @params (HTMLDom) element
     */
    constructor(element) {
        this.setComponent(element);
    }

    /**
     * Set dark mode component.
     * @params (HTMLDom) element
     */
    setComponent(element) {
        this.element = element;
        this.element.addEventListener("click", this);
    }

    /**
     * handle event.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.type == "click" && event.currentTarget.dataset.action == "toggle") this.toggle();
    }

    /**
     * Toggle dark mode.
     */
    toggle() {
        toggleAllTransition();
        this.isDarkModeEnabled()
            ? this.hide()
            : this.show();
    }

    /**
     * Show dark mode.
     */
    show() {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
    }

    /**
     * Hide dark mode.
     */
    hide() {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark")
    }

    /**
     * Check if dark mode is enabled or not.
     * @return (boolean) isDarkModeEnabled
     */
    isDarkModeEnabled() {
        let isDarkModeEnabled = false;
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) isDarkModeEnabled = true;
        return isDarkModeEnabled;
    }
}

const componentSelector = "[data-component='darkmode']";
const componentObject = DarkMode;
        
setComponentObjectByQuery(componentSelector, componentObject);

export default DarkMode;