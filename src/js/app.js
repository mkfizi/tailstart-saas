"use strict";

// Execute when document DOM is loaded to make sure site contents are rendered.
window.onload = () => {

    // Stores active component for handling click outside.
    let activeTarget = null;
    let activeToggle = null;

    // Stores current component for handling toggle click.
    let currentTarget = null;
    let currentToggle = null;
    
    // Stores active sidebar position.
    let sidebarPosition = null;

    // Stores elements with focus trap. This variable uses array to handle focus 
    // trap elements that have a focus trap child elements.
    let focusTrapElements = [];

    /**
     * Set backdrop.
     * @returns {HTMLDom} backdrop
     */
    const setBackdrop = () => {
        let backdrop = document.createElement("div");
        backdrop.setAttribute("class", "fixed w-screen h-screen bg-neutral-900 opacity-50 z-20 transition top-0 left-0");
        backdrop.setAttribute("data-target", currentTarget);
        backdrop.setAttribute("data-toggle", currentToggle);
        backdrop.setAttribute("data-backdrop", currentTarget);
        backdrop.addEventListener("click", handleToggle);
        return backdrop;
    }

    /**
     * Clear backdrop element.
     */
    const clearBackdrop = () => {
        let backdrop = document.querySelector(`[data-backdrop="${currentTarget}"]`);
        if (backdrop != null) backdrop.remove();
    }

    /**
     * Enable body scroll.
     */
    const enableBodyScroll = () => {
        let body = document.getElementsByTagName("BODY")[0];
        body.classList.remove("overflow-y-hidden")
    }

    /**
     * Disable body scroll.
     */
    const disableBodyScroll = () => {
        let body = document.getElementsByTagName("BODY")[0];
        body.classList.add("overflow-y-hidden")
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
     * Hide alert.
     */
    const hideAlert = () => {
        if (currentTarget == null) return null;

        let targetElement = document.getElementById(currentTarget);
        targetElement.remove();
        disableTab(targetElement);
    }

    /**
     * Toggle collapse state.
     */
    const toggleCollapse = () => {
        if (currentTarget == null) return null;

        let targetElement = document.getElementById(currentTarget);
        targetElement.classList.contains("h-0")
            ? showCollapse(targetElement)      
            : hideCollapse(targetElement);

        toggleIcon(currentTarget);

        if (targetElement.hasAttribute("data-accordion")) {
            let accordionId = targetElement.dataset.accordion;
            toggleAccordion(accordionId);
        }
    }

    /**
     * Show collapse.
     * @param {HTMLDom} element 
     */
    const showCollapse = targetElement => {
        targetElement.classList.remove("h-0");
            
        let contentHeight = targetElement.clientHeight + "px";

        targetElement.style.height = "0";
        setTimeout(() => targetElement.style.height = contentHeight, 50);
        setTimeout(() => targetElement.removeAttribute("style"), 500);
        enableTab(targetElement);
    }

    /**
     * Hide collapse.
     * @param {HTMLDom} targetElement 
     */
    const hideCollapse = targetElement => {
        let contentHeight = targetElement.clientHeight + "px";

        targetElement.style.height = contentHeight;
        setTimeout(() => targetElement.style.height = "0", 50);
        setTimeout(() => targetElement.removeAttribute("style"), 500);
        targetElement.classList.add("h-0");   
        disableTab(targetElement);
    }

    /**
     * Toggle icon state.
     * @param {string} currentTarget 
     */
    const toggleIcon = currentTarget => {
        let icon = document.querySelector(`[data-icon=${currentTarget}]`)

        if (icon != null) {
            icon.classList.contains("rotate-180")
                ? icon.classList.remove("rotate-180")
                : icon.classList.add("rotate-180");
        }
    }

    /**
     * Toggle accordion state.
     * @param {string} accordionId 
     */
    const toggleAccordion = accordionId => {
        let accordions = document.querySelectorAll(`[data-accordion="${accordionId}"]`);

        if (accordions != null) {
            for (let i = 0; i < accordions.length; i++) {
                if (accordions[i].getAttribute("id") != currentTarget && ! accordions[i].classList.contains("h-0")) {
                    hideCollapse(accordions[i])
                    toggleIcon(accordions[i].getAttribute("id"));
                }
            }
        }
    }

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
     * Toggle dropdown.
     * @returns 
     */
    const toggleDropdown = () => {
        if (currentTarget == null) return null;

        let targetElement = null;

        targetElement = document.getElementById(currentTarget);
        targetElement != null && targetElement.classList.contains("scale-0", "opacity-0")
            ? showDropdown(targetElement)
            : hideDropdown(targetElement);
    }

    /**
     * Show dropdown.
     * @param {HTMLDom} targetElement 
     */
    const showDropdown = targetElement => {
        targetElement.classList.remove("scale-0", "opacity-0");
        enableTab(targetElement);
    }

    /**
     * Hide dropdown.
     * @param {HTMLDom} targetElement 
     */
    const hideDropdown = targetElement => {
        targetElement.classList.add("scale-0", "opacity-0");
        disableTab(targetElement);
    }

    /**
     * Toggle modal.
     */
    const toggleModal = () => {
        if (currentTarget == null) return null;
        
        let targetElement = document.getElementById(currentTarget);

        targetElement != null && targetElement.classList.contains("hidden")
            ? showModal(targetElement)
            : hideModal(targetElement);
    }

    /**
     * Show modal.
     * @param {HTMLDom} targetElement 
     */
    const showModal = targetElement => {
        targetElement.classList.remove("hidden", "opacity-0");
        targetElement.classList.add("flex");

        let targetModal = document.querySelector(`[data-modal="${currentTarget}"]`)

        if (targetModal != null) setTimeout(() => {targetModal.classList.remove("scale-0"); }, 10); 

        targetElement.insertBefore(setBackdrop(), targetElement.firstChild);

        disableBodyScroll();
        enableFocusTrap(targetElement);
    }
    
    /**
     * Hide modal.
     * @param {HTMLDom} targetElement 
     */
    const hideModal = targetElement => {
        targetElement.classList.add("hidden", "opacity-0");
        targetElement.classList.remove("flex");

        let targetModal = document.querySelector(`[data-modal="${currentTarget}"]`)

        if (targetModal != null) targetModal.classList.add("scale-0"); 

        clearBackdrop();
        enableBodyScroll();
        disableFocusTrap();
    }

    /**
     * Toggle sidebar state.
     */
    const toggleSidebar = () => {
        if (currentTarget == null) return null;
        
        let targetElement = document.getElementById(currentTarget);
        if (targetElement != null && targetElement.classList.contains("-translate-x-full")) sidebarPosition = "-translate-x-full";
        if (targetElement != null && targetElement.classList.contains("translate-x-full")) sidebarPosition = "translate-x-full";

        targetElement != null && targetElement.classList.contains(sidebarPosition)
            ? showSidebar(targetElement)
            : hideSidebar(targetElement);
    }
    
    /**
     * Show sidebar.
     * @param {HTMLDom} targetElement 
     */
    const showSidebar = targetElement => {
        targetElement.classList.remove(sidebarPosition, "shadow-2xl");
        targetElement.parentNode.insertBefore(setBackdrop(), targetElement);
        disableBodyScroll();
        enableFocusTrap(targetElement);
    }

    /**
     * Hide sidebar.
     * @param {HTMLDom} targetElement 
     */
    const hideSidebar = targetElement => {
        targetElement.classList.add(sidebarPosition, "shadow-2xl");
        clearBackdrop();
        enableBodyScroll();
        disableFocusTrap();
    }

    const enableTab = targetElement => {
        targetElement.setAttribute("tabindex", 0);
        targetElement.classList.remove("invisible");
    }

    const disableTab = targetElement => {
        targetElement.setAttribute("tabindex", -1);
        setTimeout(() => { targetElement.classList.add("invisible"); }, 50);
    }

    /**
     * Enable focus trap.
     * @param {HTMLDom} targetElement 
     */
    const enableFocusTrap = targetElement => {
        focusTrapElements.push(targetElement);
        setFocusOnFocusTrapElement();
        focusTrapElements[focusTrapElements.length - 1].addEventListener("keydown", handleFocusTrap);
    }

    /**
     * Disable focus trap.
     */
    const disableFocusTrap = () => {
        disableTab(focusTrapElements[focusTrapElements.length - 1]);
        focusTrapElements[focusTrapElements.length - 1].removeEventListener("keydown", handleFocusTrap);
        focusTrapElements.pop();

        if (focusTrapElements.length != 0) setFocusOnFocusTrapElement();
    }

    /**
     * Set focus on focust trap element.
     */
    const setFocusOnFocusTrapElement = () => {
        enableTab(focusTrapElements[focusTrapElements.length - 1]);
        focusTrapElements[focusTrapElements.length - 1].focus();
        setTimeout(() => { focusTrapElements[focusTrapElements.length - 1].removeAttribute("tabindex"); }, 50);
    }

    /**
     * Handle focus trap.
     * @param {object} event 
     */
    const handleFocusTrap = event => {
        let focusableElements = focusTrapElements[focusTrapElements.length - 1].querySelectorAll(`a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex="0"], [contenteditable]`); 

        // Filter element where parent have [tabindex="-1"].
        let filterFocusableElements = [];
        for (let i = 0; i < focusableElements.length; i++) {
            if (! focusableElements[i].closest(`[tabindex="-1"]`)) {
                filterFocusableElements.push(focusableElements[i])
            }
        }

        let firstElement = filterFocusableElements[0];
        let lastElement = filterFocusableElements[filterFocusableElements.length - 1];

        if (event.type === "keydown" && event.keyCode === 9) {
            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    }

    /**
     * Handle toggle click event.
     * @param {object} event 
     */
    const handleToggle = event => {
        let toggleElement = event.currentTarget;
        currentToggle = toggleElement.dataset.toggle;

        toggleElement.hasAttribute("data-target")
            ? currentTarget = toggleElement.dataset.target
            : currentTarget = null;

        // Handle click outside when click on order dropdown toggle.
        if (currentTarget != activeTarget && activeToggle == "dropdown") {
            let targetElement = document.getElementById(activeTarget);
            if (targetElement != null) hideDropdown(targetElement);
        }

        switch(currentToggle) {
            case "alert": 
                hideAlert();
                break;
            case "collapse": 
                toggleCollapse();
                break;
            case "dark-mode":
                toggleDarkMode();
                break;
            case "dropdown":
                toggleDropdown();
                break;
            case "modal":
                toggleModal();
                break;
            case "sidebar":
                toggleSidebar();
                break;
            default:
                console.error("Target element has null [data-toggle] value");
        }

        activeTarget = currentTarget;
        activeToggle = currentToggle;
    }

    // Store nodes of elements with [data-toggle] attribute.
    let buttonToggle = document.querySelectorAll("[data-toggle]");

    // Add click event to all button toggles.
    for (let i = 0; i < buttonToggle.length; i++) {
        buttonToggle[i].addEventListener("click", handleToggle);
    }

    // Handle click outside event for dropdowns.
    const handleDropdownClickOutside = event => {
        if (activeToggle == "dropdown" && ! (event.target.closest(`[data-target="${activeTarget}"]`) || event.target.closest(`#${activeTarget}`))) {
            let targetElement = document.getElementById(activeTarget)
            hideDropdown(targetElement);
        }
    }

    // Add click event on window.
    window.addEventListener("click", handleDropdownClickOutside);

    // Add click event on window for touch based screen.
    window.addEventListener("touchstart", handleDropdownClickOutside);


    /**
     * Handle dashboard if sidebar is active on mobile and window is resized to desktop.
     * @param {object} event 
     */
    const handleDashboard = event => {
        const targetElement = document.getElementById("dashboard");

        if (targetElement != null) {
            toggleTransitionNone(targetElement);
            if (window.innerWidth >= 1024 && activeTarget == "dashboard") {
                hideSidebar(targetElement);
                enableTab(targetElement);
            } else {
                if (targetElement.classList.contains("-translate-x-full") || targetElement.classList.contains("translate-x-full")) disableTab(targetElement);
            }
        }
    }

    // Event listener for dashboard when resizing from mobile to desktop.
    window.addEventListener("resize", handleDashboard);

    // Trigger handle dashboard when first time load.
    handleDashboard();

    /**
     * Viewport fix for mobile browser.
     */
    const handleViewport = () => {
        document.documentElement.style.setProperty("--vh", (window.innerHeight * 0.01) + "px");
    }

    // Event listener for viewport fix when resizing from mobile to desktop.
    window.addEventListener("resize", handleViewport);

    // Trigger viewport fix when first time load.
    handleViewport();
}