import darkMode from "./components/dark-mode.js";

"use strict";

export let app = {
    init: () => {
        let components = {
            darkMode,
        };

        Object.values(components).forEach(component => {
            if (component.initialize != null) component.initialize();
        });
    },
};

app.init();