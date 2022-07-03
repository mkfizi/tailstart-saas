import {setObjectByQuery, toggleAllTranstition} from "../util/config.js";

class DarkMode {
    element = null; // Dark mode element

    /**
     * Dark mode constructor.
     * @params (HTMLDom) element
     */
    constructor(element) {
        this.setElement(element);
    }

    /**
     * handle event.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.type == "click") {
            toggleAllTranstition();
            this.toggle();
        }
    }

    /**
     * Toggle dark mode.
     */
    toggle() {
        if (localStorage.theme === "light" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
            this.show();
        } else if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            this.hide();
        }; 
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
     * Set dark mode element.
     * @params (HTMLDom) element
     */
    setElement(element) {
        this.element = element;
        this.element.addEventListener("click", this);
    }
}

const selector = "[data-component='DarkMode']";
const object = DarkMode;

setObjectByQuery(selector, object);

export default DarkMode;