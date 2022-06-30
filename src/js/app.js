"use strict";

import Collapse from "./component/collapse.js"
import DarkMode from "./component/dark-mode.js"
import Dashboard from "./component/dashboard.js"
import Sidebar from "./component/sidebar.js"

import {setFooterCurrentYear} from "./util/config.js"
import {handleViewport} from "./util/config.js"

const app = {
    initialize: () => {
        window.onload = () => {
            handleViewport();
            setFooterCurrentYear();
        }

        window.onresize = () => {
            handleViewport();
        }
    }
}

app.initialize();