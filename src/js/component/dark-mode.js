import {setObjectByQuery} from "../util/config.js";

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
            this.toggleTranstition();
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

    /**
     * Toggle "transition-none" class to all elements with transition classes.
     */
    toggleTranstition() {
        let transitions = document.querySelectorAll(".transition, .transition-all, .transition-colors, .transition-opacity, .transition-shadow, .transition-transform");
        for (let i = 0; i < transitions.length; i++) {
            transitions[i].classList.add("transition-none");
            setTimeout(() => { transitions[i].classList.remove("transition-none"); }, 1000);
        }
    }
}

const selector = "[data-component='DarkMode']";
const object = DarkMode;

setObjectByQuery(selector, object);

export default DarkMode;