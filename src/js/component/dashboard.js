import {initializeObjectById} from "../util/config.js";

import Sidebar from "./sidebar.js";

class Dashboard extends Sidebar{
    constructor(container) {
        super(container);
        this.initializeWindow();
    }

    initializeWindow() {
        window.addEventListener("resize", this.handleWindow.bind(this));
    }

    handleWindow() {
        this.container.classList.add("transition-none");
        setTimeout(() => { this.container.classList.remove("transition-none"); }, 1000);
        if (window.innerWidth >= 1024) this.hide();
    }
}

const selector = "dashboard";
const object = Dashboard;

initializeObjectById(selector, object);

export default Dashboard;