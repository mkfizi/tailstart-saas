"use strict";

// Execute when document DOM is loaded to make sure site contents are rendered.
window.onload = () => {

    // Stores current component for handling toggle click.
    let currentTarget = null;
    let currentToggle = null;

    // Stores active component for handling click outside.
    let activeTarget = null;
    let activeToggle = null;

    // Stores active backdrop.
    let activeBackdrop = null;
    
    /**
     * Toggle dark mode.
     */
    const toggleDarkMode = () => {
        toggleTransitionNoneAll();
        if (localStorage.theme === "light" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
            localStorage.theme = 'dark';
            document.documentElement.classList.add("dark")
        } else if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            localStorage.theme = 'light';
            document.documentElement.classList.remove("dark");
        };
    }

    /**
     * Toggle dropdown state.
     */
    const toggleDropdown = () => {
        if (currentTarget == null) return null;

        let element = document.getElementById(currentTarget);
        element != null && element.classList.contains("scale-0", "opacity-0")
            ? showDropdown(element)
            : hideDropdown(element);
    }

    /**
     * Show dropdown.
     * @param {HTMLDom} element 
     */
    const showDropdown = element => {
        element.classList.remove("scale-0", "opacity-0")
    }

    /**
     * Hide dropdown.
     * @param {HTMLDom} element 
     */
    const hideDropdown = element => {
        element.classList.add("scale-0", "opacity-0")
    }

    /**
     * Toggle sidebar state.
     */
    const toggleSidebar = () => {
        if (currentTarget == null) return null;

        let element = document.getElementById(currentTarget);
        element != null && element.classList.contains("-translate-x-full")
            ? showSidebar(element)
            : hideSidebar(element);
    }

    /**
     * Show sidebar.
     * @param {HTMLDom} element 
     */
    const showSidebar = element => {
        element.classList.remove("-translate-x-full");
        activeBackdrop = document.createElement("div");
        activeBackdrop.setAttribute("class", "fixed w-screen h-screen bg-neutral-900 opacity-50 z-20 transition top-0 left-0");
        element.parentNode.insertBefore(activeBackdrop, element);
    }

    /**
     * Hide sidebar.
     * @param {HTMLDom} element 
     */
    const hideSidebar = element => {
        element.classList.add("-translate-x-full");
        activeBackdrop.remove();
        activeBackdrop = null;
    }

    /**
     * Toggle collapse state.
     */
    const toggleCollapse = () => {
        if (currentTarget == null) return null;

        let element = document.getElementById(currentTarget);
        element.classList.contains("h-0")
            ? showCollapse(element)      
            : hideCollapse(element);

        toggleIcon(currentTarget);

        if (element.hasAttribute("data-accordion")) {
            let accordionId = element.dataset.accordion;
            toggleAccordion(accordionId, currentTarget);
        }
    }

    /**
     * Show collapse.
     * @param {HTMLDom} element 
     */
    const showCollapse = element => {
        element.classList.remove("h-0");
            
        let contentHeight = element.clientHeight + "px";

        element.style.height = "0";
        setTimeout(() => element.style.height = contentHeight, 50);
        setTimeout(() => element.removeAttribute("style"), 500);
    }

    /**
     * Hide collapse.
     * @param {HTMLDom} element 
     */
    const hideCollapse = element => {
        let contentHeight = element.clientHeight + "px";

        element.style.height = contentHeight;
        setTimeout(() => element.style.height = "0", 50);
        setTimeout(() => element.removeAttribute("style"), 500);
        element.classList.add("h-0");   
    }

    /**
     * Toggle icon state.
     * @param {string} target 
     */
    const toggleIcon = target => {
        let icon = document.querySelector(`[data-icon=${target}]`)

        if (icon != null) {
            icon.classList.contains("rotate-180")
                ? icon.classList.remove("rotate-180")
                : icon.classList.add("rotate-180");
        }
    }

    /**
     * Toggle accordion state.
     * @param {string} accordion 
     * @param {string} target 
     */
    const toggleAccordion = (accordion, target) => {
        let accordions = document.querySelectorAll(`[data-accordion="${accordion}"]`);

        if (accordions != null) {
            for (let i = 0; i < accordions.length; i++) {
                if (accordions[i].getAttribute("id") != target && ! accordions[i].classList.contains("h-0")) {
                    hideCollapse(accordions[i])
                    toggleIcon(accordions[i].getAttribute("id"));
                }
            }
        }
    }
    
    /**
     * Toggle "transition-none" class to target element.
     * @param {HTMLDom} element
     */
    const toggleTransitionNone = element => {
        element.classList.add("transition-none");
        setTimeout(() => { element.classList.remove("transition-none"); }, 100);       
    }

    /**
     * Toggle "transition-none" class to all elements with transition classes.
     */
    const toggleTransitionNoneAll = () => {
        let transitions = document.querySelectorAll(".transition, .transition-all, .transition-colors, .transition-opacity, .transition-shadow, .transition-transform");
        for (let i = 0; i < transitions.length; i++) {
            transitions[i].classList.add("transition-none");
            setTimeout(() => { transitions[i].classList.remove("transition-none"); }, 100);
        }
    }

    /**
     * Toggle switch cases.
     * @param {string} toggle 
     */
    const toggleSwitch = toggle => {
        switch(toggle) {
            case "dark-mode": 
                toggleDarkMode();
                break;
            case "dropdown":
                toggleDropdown();
                break;
            case "sidebar":
                toggleSidebar();
                break;
            case "collapse": 
                toggleCollapse();
                break;
            default:
                console.error("Target element has null [data-toggle] value");
        }

        // Prevents method callback when in inactive state.
        if (activeTarget == currentTarget) {
            activeTarget = null;
            activeToggle = null;
        } else {
            activeTarget = currentTarget;
            activeToggle = currentToggle;
        }
    }

    /**
     * Handle dashboard if sidebar is active on mobile and window is resized to desktop.
     * @param {object} event 
     */
    const handleDashboard = event => {
        const element = document.getElementById("dashboard");

        if (event.type == "resize" && element != null) {
            toggleTransitionNone(element);
            if (window.innerWidth >= 1024 && activeTarget == "dashboard") {
                toggleSwitch(activeToggle)
            }
        }
    }

    // Event listener for dashboard when resizing from mobile to desktop.
    window.addEventListener("resize", handleDashboard);

    /**
     * Handle window click event.
     * @param {object} event 
     */
    const handleClick = event => {

        // Handle click outside.
        const clickOutsideListener = ["dropdown", "sidebar"];

        if (activeTarget != null && clickOutsideListener.includes(activeToggle)) {
            if (! (event.target.closest(`[data-target="${activeTarget}"]`) || event.target.closest(`#${activeTarget}`))) {
                currentTarget = activeTarget;
                currentToggle = activeToggle;
                toggleSwitch(currentToggle);
            }
        }

        // Handle click on toggle.
        let button = event.target.closest("[data-toggle");

        if (button != null) {
            if (button.hasAttribute("data-target")) currentTarget = button.dataset.target;
            currentToggle = button.dataset.toggle;
            toggleSwitch(currentToggle);
        }
    }
 
    // Event listener for toggle click and outside click.
    window.addEventListener("click", handleClick);
}