import DarkMode from "./component/dark-mode.js";
import Navbar from "./component/navbar.js";
import Sidebar from "./component/sidebar.js";

"use strict";

export let app = {
    init: () => {
        let initialize = [
            DarkMode,
            Navbar,
            Sidebar,
        ];

        for (let i = 0; i < initialize.length; i++) {
            initialize[i]();
        }
    },
};

app.init();