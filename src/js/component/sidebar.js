import {setObjectByQuery} from "../util/config.js";

import Backdrop from "../util/backdrop.js";
import FocusTrap from "../util/focus-trap.js";

class Sidebar{
    element = null;   // Sidebar element
    position = null;    // Sidebar position

    /**
     * Sidebar constructor.
     * @params (HTMLDom) element
     */
    constructor(element) {
        this.element = element;

        this.setPosition();
        this.setButton();
    }

    /**
     * Handle event.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.currentTarget.dataset.action != null) {
            if (event.currentTarget.dataset.action == "show" && event.type == "click") this.show();
            if (event.currentTarget.dataset.action == "hide" && event.type == "click") this.hide();
        }
    }
    
    /**
     * Show sidebar.
     */
    show() {
        this.element.classList.remove(this.position);
        this.focusTrap = new FocusTrap(this);
        this.backdrop = new Backdrop(this);
    }

    /**
     * Hide sidebar.
     */
    hide() {
        this.element.classList.add(this.position);
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
        if (this.element.classList.contains("-translate-x-full")) this.position = "-translate-x-full";
        if (this.element.classList.contains("translate-x-full")) this.position = "translate-x-full";
    }

    /**
     * Set sidebar buttons.
     */
    setButton() {
        if (this.element.getAttribute("id") == null) return null;

        let buttons = document.querySelectorAll(`[data-target="${this.element.getAttribute("id")}"]`);
        for (let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", this);
        }
    }

}

const selector = "[data-component='Sidebar']";
const object = Sidebar;

setObjectByQuery(selector, object);

export default Sidebar;