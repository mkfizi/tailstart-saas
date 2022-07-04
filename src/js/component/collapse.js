import {setComponentObjectByQuery} from "../util/config.js";

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
        this.isCollapseActive()
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

        this.toggleCollapseIcon();
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

        this.toggleCollapseIcon();
    }

    /**
     * Set sidebar component.
     * @params (HTMLDom) element
     */
    setComponent(element) {
        this.element = element;
        this.id = this.element.getAttribute("id");
        
        let buttons = document.querySelectorAll(`[data-target="${this.id}"][data-trigger="collapse"]`);
        for (let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", this);
        }
    }

     /**
     * Check if collapse is active or not.
     * @return (boolean) isDropdownActive
     */
    isCollapseActive() {
        let isCollapseActive = false;
        if (! this.element.classList.contains("h-0")) return true;
        return isCollapseActive;
    }

    toggleCollapseIcon() {
        let icons = document.querySelectorAll(`[data-icon="${this.id}"]`);
        for (let i = 0; i < icons.length; i++){
            this.isCollapseActive()
                ? icons[i].classList.add("rotate-180")
                : icons[i].classList.remove("rotate-180")
        }
    }
}

const componentSelector = "[data-component='collapse']";
const componentObject = Collapse;

setComponentObjectByQuery(componentSelector, componentObject);

export default Collapse;