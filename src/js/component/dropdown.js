import {setComponentByQuery} from "../util/config.js";

import ClickOutside from "../util/click-outside.js";

class Dropdown {
    clickOutside = null;    // Dropdown click outside
    element = null;         // Dropdown element
    id = null;              // Dropdown id

    buttons = [];           // Dropdown button

    /**
     * Dropdown constructor.
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
        if (event.type == "click" && event.currentTarget.dataset.action == "toggle") this.toggle();
    }
    
    /**
     * Toggle collapse.
     * @params (HTMLDom) currentTarget
     */
    toggle() {
        this.isActive()
            ? this.hide()
            : this.show();
    }

    /**
     * Show dropdown.
     */
    show() {
        this.element.classList.remove("scale-0", "opacity-0");

        this.clickOutside = new ClickOutside(this);
    }

    /**
     * Hide dropdown.
     */
    hide() {
        this.element.classList.add("scale-0", "opacity-0");

        if (this.clickOutside != null) {
            this.clickOutside.destructor();
            this.clickOutside = null;
        }
    }
    
    /**
     * Set dropdown component.
     * @params (HTMLDom) element
     */
    setComponent(element) {
        this.element = element;
        this.id = this.element.getAttribute("id");

        this.buttons = document.querySelectorAll(`[data-target="${this.id}"][data-trigger="${this.constructor.name}"]`);
        for (let i = 0; i < this.buttons.length; i++){
            this.buttons[i].addEventListener("click", this);
        }
    }

    /**
     * Check if dropdown is active or not.
     * @return (boolean) isDropdownActive
     */
    isActive() {
        let isActive = false;
        if(! this.element.classList.contains("scale-0", "opacity-0")) isActive = true;
        return isActive;
    }
}

const selector = "[data-component='Dropdown']";
const object = Dropdown;

const dropdowns = setComponentByQuery(selector, object);

export default Dropdown;