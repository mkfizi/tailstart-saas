"use strict";

import Collapse from "./component/collapse.js"
import Dropdown from "./component/dropdown.js"
import Sidebar from "./component/sidebar.js"

import DarkMode from "./util/dark-mode.js"
import Dashboard from "./util/dashboard.js"
import RequiredValidation from "./util/required-validation.js"

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
        if (event.type == "load" || event.type == "resize") this.setViewport();    
    }

    /**
     * Handle viewport issues for mobile browsers.
     * - Refer https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
     */
    setViewport() {
        const viewportHeight = window.innerHeight * 0.01;
        document.documentElement.style.setProperty("--vh", viewportHeight + "px");
    }

}

const app = new App;