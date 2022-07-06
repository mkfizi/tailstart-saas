import {setComponentByQuery} from "../util/config.js";

class Collapse {
    element = null;     // Collapse element

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
        if (event.type == "click" && event.currentTarget.dataset.action == "toggle") this.toggle();
    }

    /**
     * Toggle collapse.
     */
    toggle() {
        this.isActive()
            ? this.hide()
            : this.show();
    }

    /**
     * Show collapse.
     */
    show() {
        this.element.classList.remove("h-0");

        let containerHeight = this.element.clientHeight + "px";

        this.element.style.height = "0";
        setTimeout(() => this.element.style.height = containerHeight, 50);
        setTimeout(() => this.element.removeAttribute("style"), 500);

        this.toggleIcon();

        if (this.isAccordion()) this.toggleAccordion(this);
    }

    /**
     * Hide collapse.
     * @params (element) content
     * @params (element) icon
     */
    hide() {
        let containerHeight = this.element.clientHeight + "px";

        this.element.style.height = containerHeight;
        setTimeout(() => this.element.style.height = "0", 50);
        setTimeout(() => this.element.removeAttribute("style"), 500);
        this.element.classList.add("h-0");

        this.toggleIcon();
    }

    /**
     * Set sidebar component.
     * @params (HTMLDom) element
     */
    setComponent(element) {
        this.element = element;
        this.id = this.element.getAttribute("id");
        
        let buttons = document.querySelectorAll(`[data-target="${this.id}"][data-trigger="${this.constructor.name}"]`);
        for (let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", this);
        }
    }

    /**
     * Check if collapse is active or not.
     * @return (boolean) isDropdownActive
     */
    isActive() {
        let isActive = false;
        if (! this.element.classList.contains("h-0")) isActive = true;
        return isActive;
    }

    /**
     * Toggle collapse icon.
     */
    toggleIcon() {
        let icons = document.querySelectorAll(`[data-icon="${this.id}"]`);
        for (let i = 0; i < icons.length; i++){
            this.isActive()
                ? icons[i].classList.add("rotate-180")
                : icons[i].classList.remove("rotate-180")
        }
    }

    /**
     * Check if collapse is accordion or not.
     * @return (boolean) isDropdownActive
     */
    isAccordion() {
        let isCollapseAccordion = false;
        if (this.element.getAttribute("data-accordion") != null) isCollapseAccordion = true;
        return isCollapseAccordion;
    }

    /**
     * Toggle accordion.
     */
     toggleAccordion() {
        for (let i = 0; i < collapses.length; i++) {
            if(collapses[i] != this){
                collapses[i].hide();
            }
        }
    }
}

const selector = "[data-component='Collapse']";
const object = Collapse;

const collapses = setComponentByQuery(selector, object);

export default Collapse;