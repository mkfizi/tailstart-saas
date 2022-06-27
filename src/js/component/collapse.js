import {initializeObjectByQuery} from "../config.js";

class Collapse {
    constructor(container) {
        this.container = container;
        this.initialize();
    }

    initialize() {
        // if (this.container.getAttribute("id") == null) return null;

        // let id = this.container.getAttribute("id");
        let buttons = this.container.querySelectorAll("[data-target]");
        for (let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", this);
        }
    }

    handleEvent(event) {
        this.action = event.currentTarget.dataset.action;
        this.targetElement = this.container.querySelector("[id='"+event.currentTarget.dataset.target+"']");
        this.icon =  event.currentTarget.querySelector("[data-icon='Collapse']");
        console.log(this);
        if (this.action == null) return null;
        if (this.action == "toggle") this.toggle();
    }

    toggle() {
        this.targetElement.classList.contains("h-0")
            ? this.show()
            : this.hide();
    }

    show() {
        this.icon.classList.add("rotate-180");
        this.targetElement.classList.remove("h-0")
        let containerHeight = this.targetElement.clientHeight + "px";
        this.targetElement.style.height = "0";
        setTimeout(() => this.targetElement.style.height = containerHeight, 50);
        setTimeout(() => this.targetElement.removeAttribute("style"), 500);
    }

    hide() {
        this.icon.classList.remove("rotate-180");
        let containerHeight = this.targetElement.clientHeight + "px";
        this.targetElement.style.height = containerHeight;
        setTimeout(() => this.targetElement.style.height = "0", 50);
        setTimeout(() => this.targetElement.removeAttribute("style"), 500);
        this.targetElement.classList.add("h-0")
    }
}

const selector = "[data-component='Collapse']";
const object = Collapse;

initializeObjectByQuery(selector, object);

export default Collapse;