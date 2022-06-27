import {initializeObjectByQuery} from "../config.js";

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
        let toggle = event.currentTarget.dataset.toggle;
        if (toggle == null) return null;
        if (toggle == "show") this.show();
        if (toggle == "hide") this.hide();
    }

    show() {
        this.container.classList.remove(this.position);

        this.focusTrap = new FocusTrap(this);
        this.backdrop = new Backdrop(this);
    }

    hide() {
        this.container.classList.add(this.position);
        
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