import {setComponentObjectById, toggleTransition} from "../util/config.js";

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
        if (event.type == "resize") {
            console.log("kontol")
            toggleTransition(this.element);
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

const dashboard = setComponentObjectById(selector, object);

console.log(dashboard);

export default Dashboard;