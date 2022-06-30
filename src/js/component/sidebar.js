import {initializeObjectByQuery} from "../util/config.js";

import Backdrop from "../util/backdrop.js";
import FocusTrap from "../util/focus-trap.js";

class Sidebar{
    constructor(container) {
        this.container = container;
        if (this.container.classList.contains("-translate-x-full")) this.position = "-translate-x-full";
        if (this.container.classList.contains("translate-x-full")) this.position = "translate-x-full";
        this.initialize();
    }

    initialize() {
        if (this.container.getAttribute("id") == null) return null;

        let id = this.container.getAttribute("id");
        let buttons = document.querySelectorAll("[data-target='"+id+"']");
        
        for (let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", this);
        }
    }

    handleEvent(event) {
        let action = event.currentTarget.dataset.action;
        if (action == null) return null;
        if (action == "show") this.show();
        if (action == "hide") this.hide();
    }

    show() {
        this.container.classList.remove(this.position);

        this.focusTrap = new FocusTrap(this);
        this.backdrop = new Backdrop(this);
    }

    hide() {
        this.container.classList.add(this.position);
        if (this.focusTrap == null && this.backdrop == null) return null;
        this.focusTrap.destroy();
        this.focusTrap = null;
        this.backdrop.destroy();
        this.backdrop = null;
    }
}

const selector = "[data-component='Sidebar']";
const object = Sidebar;

initializeObjectByQuery(selector, object);

export default Sidebar;