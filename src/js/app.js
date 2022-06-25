import Navbar from "./component/navbar.js";
import Sidebar from "./component/sidebar.js";

import DarkMode from "./util/dark-mode.js";
import Dashboard from "./util/dashboard.js";

"use strict";

export let app = {
    component: () => {
        let component = [
            Navbar,
            Sidebar,
        ];

        for (let i = 0; i < component.length; i++) {
            component[i]();
        }

    },

    util: () => {
        let util = [
            DarkMode,
            Dashboard,
        ];
        
        for (let i = 0; i < util.length; i++) {
            util[i]();
        }
    },

    init: () => {
        app.component();
        app.util();
    },
};

app.init();