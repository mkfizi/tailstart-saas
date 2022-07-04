import ClickOutside from "../util/click-outside.js";
import {setComponentObjectByQuery} from "../util/config.js";

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
     * Set dropdown component.
     * @params (HTMLDom) element
     */
    setComponent(element) {
        this.element = element;
        this.id = this.element.getAttribute("id");

        this.buttons = document.querySelectorAll(`[data-target="${this.id}"][data-trigger="dropdown"]`);
        
        for (let i = 0; i < this.buttons.length; i++){
            this.buttons[i].addEventListener("click", this);
        }
    }

    /**
     * Handle evenet.
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
        this.isDropdownActive()
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

        this.clickOutside.destructor();
        this.clickOutside = null;
    }
    
    /**
     * Check if dropdown is active or not.
     * @return (boolean) isDropdownActive
     */
    isDropdownActive() {
        let isDropdownActive = false;
        if(! this.element.classList.contains("scale-0", "opacity-0")) isDropdownActive = true;
        return isDropdownActive;
    }
}

const componentSelector = "[data-component='dropdown']";
const componentObject = Dropdown;

setComponentObjectByQuery(componentSelector, componentObject);

export default Dropdown;