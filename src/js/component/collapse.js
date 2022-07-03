import {setObjectByQuery} from "../util/config.js";

class Collapse {
    element = null;     // Collapse element

    /**
     * Sidebar constructor.
     * @params (HTMLDom) element
     */
     constructor(element) {
        this.setElement(element);
    }

    /**
     * Handle event.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.type == "click") {
            if (event.currentTarget.dataset.action == "toggle") this.toggle(event.currentTarget);
        }
    }

    /**
     * Toggle collapse.
     * @params (HTMLDom) currentTarget
     */
    toggle(currentTarget) {
        let content = this.element.querySelector(`[id="${currentTarget.dataset.target}"]`);
        let icon = this.element.querySelector(`[data-icon="${currentTarget.dataset.target}"]`);
        content.classList.contains("h-0")
            ? this.show(content, icon)
            : this.hide(content, icon);
    }

    /**
     * Show collapse.
     * @params (element) content
     * @params (element) icon
     */
    show(content, icon) {
        icon.classList.add("rotate-180");
        content.classList.remove("h-0");

        let containerHeight = content.clientHeight + "px";

        content.style.height = "0";
        setTimeout(() => content.style.height = containerHeight, 50);
        setTimeout(() => content.removeAttribute("style"), 500);
    }

    /**
     * Hide collapse.
     * @params (element) content
     * @params (element) icon
     */
    hide(content, icon) {
        icon.classList.remove("rotate-180");

        let containerHeight = content.clientHeight + "px";

        content.style.height = containerHeight;
        setTimeout(() => content.style.height = "0", 50);
        setTimeout(() => content.removeAttribute("style"), 500);
        content.classList.add("h-0")
    }


    /**
     * Set sidebar element.
     * @params (HTMLDom) element
     */
     setElement(element) {
        this.element = element;
        let buttons = this.element.querySelectorAll("[data-target]");
        for (let i = 0; i < buttons.length; i++){
            buttons[i].addEventListener("click", this);
        }
    }
}

const selector = "[data-component='Collapse']";
const object = Collapse;

setObjectByQuery(selector, object);

export default Collapse;