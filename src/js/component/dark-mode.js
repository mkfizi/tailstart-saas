import {initializeObjectByQuery} from "../config.js";

class DarkMode {
    constructor(element) {
        this.activate(element);
    }

    activate(element) {
        element.addEventListener("click", this.toggle);
    }

    toggle() {
        let transitions = document.querySelectorAll(".transition, .transition-all, .transition-colors, .transition-opacity, .transition-shadow, .transition-transform");
        for (let i = 0; i < transitions.length; i++) {
            transitions[i].classList.add("transition-none");
            setTimeout(() => { transitions[i].classList.remove("transition-none"); }, 1000);
        }

        if (localStorage.theme === "light" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
            localStorage.theme = "dark";
            document.documentElement.classList.add("dark");
        } else if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            localStorage.theme = "light";
            document.documentElement.classList.remove("dark")
        }; 
    }
}

const QUERY = "[data-util='DarkMode']";
const OBJECT = DarkMode;

initializeObjectByQuery(QUERY, OBJECT);

export default DarkMode;