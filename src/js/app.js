"use strict";

// import Collapse from "./component/collapse.js"
import DarkMode from "./component/dark-mode.js"
import Dashboard from "./component/dashboard.js"
import Sidebar from "./component/sidebar.js"

class App {
    /**
     * App constructor.
     */
    constructor() {
        window.addEventListener("load", this);
        window.addEventListener("resize", this);
    }

    /**
     * App event handler.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.type == "load") this.setFooterCurrentYear();  
        this.setViewport();    
    }

    /**
     * Handle viewport issues for mobile browsers.
     * - Refer https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
     */
    setViewport() {
        const viewportHeight = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", viewportHeight + "px");
    }

    /**
     * Set footer current year.
     */
    setFooterCurrentYear() {
        const footerCurrentYear = document.getElementById("footerCurrentYear");
        footerCurrentYear.innerHTML = new Date().getFullYear();
    }

}

const app = new App;