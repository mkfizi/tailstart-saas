import { setBackdrop, setComponentByQuery } from "../util/config.js";

import ClickOutside from "../util/click-outside.js";
import FocusTrap from "../util/focus-trap.js";

class Sidebar {
    element = null;         // Sidebar element
    position = null;        // Sidebar position
    backdrop = null;        // Sidebar position

    /**
     * Sidebar constructor.
     * @params (HTMLDom) element
     */
    constructor(element) {
        this.setComponent(element);
    }

    /**
     * Handle event.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.type == "click") {
            if (event.currentTarget.dataset.action == "show") this.show();
            if (event.currentTarget.dataset.action == "hide") this.hide();
        }
    }

    /**
     * Show sidebar.
     */
    show() {
        this.element.classList.remove(this.position);

        this.clickOutside = new ClickOutside(this);
        this.focusTrap = new FocusTrap(this);

        this.backdrop = setBackdrop();
        this.element.parentNode.insertBefore(this.backdrop, this.element);
    }

    /**
     * Hide sidebar.
     */
    hide() {
        this.element.classList.add(this.position);

        if (this.backdrop != null && this.clickOutside != null && this.focusTrap != null) {
            this.backdrop.remove();
            this.clickOutside.destructor();
            this.focusTrap.destructor();

            this.backdrop = null;
            this.clickOutside = null;
            this.focusTrap = null;
        }
    }

    /**
     * Set sidebar element.
     * @params (HTMLDom) element
     */
    setComponent(element) {
        this.element = element;
        this.id = this.element.getAttribute("id");

        if (this.element.classList.contains("-translate-x-full")) this.position = "-translate-x-full";
        if (this.element.classList.contains("translate-x-full")) this.position = "translate-x-full";

        this.buttons = document.querySelectorAll(`[data-target="${this.id}"][data-trigger="${this.constructor.name}"]`);
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].addEventListener("click", this);
        }
    }
}

const selector = "[data-component='Sidebar']";
const object = Sidebar;

export const sidebars = setComponentByQuery(selector, object);

export default Sidebar;