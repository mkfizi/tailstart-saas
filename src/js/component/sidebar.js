import {initializeObjectByQuery} from "../util/config.js";

import Backdrop from "../util/backdrop.js";
import FocusTrap from "../util/focus-trap.js";

class Sidebar{
    container = null;   // Sidebar element
    position = null;    // Sidebar position
    buttons = []

    /**
     * Sidebar constructor.
     * @params (HTMLDom) element
     */
    constructor(container) {
        this.container = container;
        
        this.setPosition();
        this.setButton();
    }

    /**
     * Handle event.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.currentTarget.dataset.action == "show" && event.type == "click") this.show();
        if (event.currentTarget.dataset.action == "hide" && event.type == "click") this.hide();
    }
    
    /**
     * Show sidebar.
     */
    show() {
        this.container.classList.remove(this.position);
        this.focusTrap = new FocusTrap(this);
        this.backdrop = new Backdrop(this);
    }

    /**
     * Hide sidebar.
     */
    hide() {
        this.container.classList.add(this.position);
        if (this.focusTrap != null && this.backdrop != null) {
            this.focusTrap.destructor();
            this.backdrop.destructor();
            this.focusTrap = null;
            this.backdrop = null;
        }
    }

    /**
     * Set sidebar position.
     */
    setPosition() {
        if (this.container.classList.contains("-translate-x-full")) this.position = "-translate-x-full";
        if (this.container.classList.contains("translate-x-full")) this.position = "translate-x-full";
    }

    /**
     * Set sidebar buttons.
     */
    setButton() {
        if (this.container.getAttribute("id") == null) return null;

        let buttons = document.querySelectorAll(`[data-target="${this.container.getAttribute("id")}"]`);
        for (let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", this);
        }
    }

}

const selector = "[data-component='Sidebar']";
const object = Sidebar;

initializeObjectByQuery(selector, object);

export default Sidebar;