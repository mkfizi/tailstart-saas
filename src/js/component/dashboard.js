import {setObjectById} from "../util/config.js";

import Sidebar from "./sidebar.js";

class Dashboard extends Sidebar{
    /**
     * Sidebar constructor.
     * @params (HTMLDom) element
     */
    constructor(element) {
        super(element);
        this.setWindow();
    }

    /**
     * Handle event.
     * @params (object) event
     */
    handleEvent(event) {
        super.handleEvent(event);
        if (event.currentTarget == window && event.type == "click") {
            this.element.classList.add("transition-none");
            setTimeout(() => { this.element.classList.remove("transition-none"); }, 1000);
            if (window.innerWidth >= 1024) this.hide();
        }
    }

    /**
     * Set window.
     * @params (HTMLDom) element
     */
    setWindow() {
        window.addEventListener("resize", this);
    }
}

const selector = "dashboard";
const object = Dashboard;

setObjectById(selector, object);

export default Dashboard;