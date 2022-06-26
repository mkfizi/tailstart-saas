import {initializeObjectByQuery} from "../config.js";

class DarkMode {
    constructor(element) {
        this.activate(element);
    }

    activate(element) {
        element.addEventListener("click", this);
    }

    handleEvent() {
        let transitions = document.querySelectorAll(".transition, .transition-all, .transition-colors, .transition-opacity, .transition-shadow, .transition-transform");
        for (let i = 0; i < transitions.length; i++) {
            transitions[i].classList.add("transition-none");
            setTimeout(() => { transitions[i].classList.remove("transition-none"); }, 1000);
        }

        if (localStorage.theme === "light" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
            this.show();
        } else if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            this.hide();
        }; 
    }

    show() {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
    }

    hide() {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark")
    }
}

const QUERY = "[data-component='DarkMode']";
const OBJECT = DarkMode;

initializeObjectByQuery(QUERY, OBJECT);

export default DarkMode;