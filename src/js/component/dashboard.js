import {setComponentObjectById, toggleTransition} from "../util/config.js";

import Sidebar from "./sidebar.js";
import {sidebars} from "./sidebar.js";

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
        if (event.type == "resize") {
            toggleTransition(this.element);
            if (window.innerWidth >= 1024) {
                this.hide();
                this.hideSidebar();
            }
        }
    }

    /**
     * Set window.
     * @params (HTMLDom) element
     */
    setWindow() {
        window.addEventListener("resize", this);
    }
    
    /**
     * Hide Sidebar instance that shares same element as Dashboard.
     */
    hideSidebar() {
        for (let i = 0; i < sidebars.length; i++) {
            if (sidebars[i].element == this.element) sidebars[i].hide()
        }
    }
}

const selector = "dashboard";
const object = Dashboard;

export const dashboard = setComponentObjectById(selector, object);

export default Dashboard;