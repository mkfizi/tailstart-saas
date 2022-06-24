import DarkMode from "./components/dark-mode.js";
import Navbar from "./components/navbar.js";

"use strict";

export let app = {
    init: () => {
        let initialize = [
            DarkMode,
            Navbar,
        ];

        for (let i = 0; i < initialize.length; i++) {
            initialize[i]();
        }
    },
};

app.init();