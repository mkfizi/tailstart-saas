import {initializeObjectById} from "../config.js";

class Dashboard {
    constructor(element) {
        this.container = element;
        this.activate()
    }

    activate() {
        window.addEventListener("resize", this);
    }

    handleEvent() {
        this.container.classList.add("transition-none");
        setTimeout(() => { this.container.classList.remove("transition-none"); }, 1000);
    }
}

const ID = "dashboard";
const OBJECT = Dashboard;

initializeObjectById(ID, OBJECT);

export default Dashboard;