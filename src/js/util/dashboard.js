import {initializeObjectById} from "../config.js";

class Dashboard {
    constructor(element) {
        this.container = element;

        window.onresize = () => {
            this.container.classList.add("transition-none");
            setTimeout(() => { this.container.classList.remove("transition-none"); }, 1000);
            // if (window.innerWidth >= 1024) _offcanvas.hide();
        };
    }
}

const ID = "dashboard";
const OBJECT = Dashboard;

initializeObjectById(ID, OBJECT);

export default Dashboard;