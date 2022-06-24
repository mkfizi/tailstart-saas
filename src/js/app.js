import DarkMode from "./components/dark-mode.js";

"use strict";

export let app = {
    init: () => {
        let initialize = [
            DarkMode,
        ];

        for (let i = 0; i < initialize.length; i++) {
            initialize[i]();
        }
    },
};

app.init();