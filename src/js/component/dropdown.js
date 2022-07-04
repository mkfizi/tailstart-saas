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
     * Handle evenet.
     * @params (object) event
     */
     handleEvent(event) {
        if (event.type == "click") {
            if (event.currentTarget.dataset.action == "toggle") this.toggle();
        }   
    }
    
    /**
     * Toggle collapse.
     * @params (HTMLDom) currentTarget
     */
    toggle() {
        this.element.classList.contains("scale-0", "opacity-0")
            ? this.show()
            : this.hide();
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
     * Set dropdown element.
     * @params (HTMLDom) element
     */
    setComponent(element) {
        this.element = element;
        this.id = this.element.getAttribute("id");

        this.buttons = document.querySelectorAll(`[data-trigger="dropdown"][data-target="${this.id}"]`);
        
        for (let i = 0; i < this.buttons.length; i++){
            this.buttons[i].addEventListener("click", this);
        }
    }
}

const componentSelector = "[data-component='dropdown']";
const componentObject = Dropdown;

setComponentObjectByQuery(componentSelector, componentObject);

export default Dropdown;