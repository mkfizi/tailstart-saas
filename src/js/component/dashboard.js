import {initializeObjectById} from "../config.js";

class Dashboard {
    constructor(container) {
        this.container = container;
        this.initialize();
    }

    initialize() {
        window.addEventListener("resize", this);
    }

    handleEvent() {
        this.container.classList.add("transition-none");
        setTimeout(() => { this.container.classList.remove("transition-none"); }, 1000);
    }
}

const selector = "dashboard";
const object = Dashboard;

initializeObjectById(selector, object);

export default Dashboard;