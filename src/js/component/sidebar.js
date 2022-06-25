import {initializeObjectByQuery} from "../config.js";

import FocusTrap from "../util/focus-trap.js";

class Sidebar {
    constructor(element) {
        this.container = element;

        if (element.getAttribute("id") == null) return;

        this.id = element.getAttribute("id");

        let buttons = document.querySelectorAll("[data-target='"+this.id+"']");
        for (let i = 0; i < buttons.length; i++){
            if (buttons[i].dataset.event == null) return;
            if (buttons[i].dataset.event == "show") this.buttonShow = buttons[i];
            if (buttons[i].dataset.event == "hide") this.buttonHide = buttons[i];
        }

        if (this.buttonShow != null) this.buttonShow.addEventListener("click", () => this.show())
        if (this.buttonHide != null) this.buttonHide.addEventListener("click", () => this.hide())
    }

    show() {
        if (this.container.classList.contains("-translate-x-full")) this.position = "-translate-x-full";
        if (this.container.classList.contains("translate-x-full")) this.position = "translate-x-full";

        this.container.classList.remove(this.position);

        FocusTrap.trigger(this.container);
        // Backdrop(this.container);
    }

    hide() {
        this.container.classList.add(this.position);
        
        FocusTrap.deactivate();
    }
}

const QUERY = "[data-component='Sidebar']";
const OBJECT = Sidebar;

initializeObjectByQuery(QUERY, OBJECT);

export default Sidebar;