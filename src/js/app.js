/**
 * Add and remove 'transition-none' classes to elements that have any 
 * 'transition' and 'transition-*' classes to avoid any animations effect
 * when toggling dark mode.
 */
const toggleTransitions = () => {
    let elements = document.querySelectorAll(`.transition, 
                                            .transition-all, 
                                            .transition-colors, 
                                            .transition-opacity, 
                                            .transition-shadow, 
                                            .transition-transform`);

    for (let i = 0; i < elements.length; i++) {
        let element = elements[i];
        element.classList.add("transition-none");
        setTimeout(() => { element.classList.remove("transition-none"); }, 1000);
    }
}

/**
 *  Toggles dark mode. 
 */
const toggleDarkMode = () => {
    toggleTransitions();

    if (localStorage.theme === "light" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: light)").matches)) {
        localStorage.theme = "dark";
        document.documentElement.classList.add("dark");
    } else if (localStorage.theme === "dark" || (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
        localStorage.theme = "light";
        document.documentElement.classList.remove("dark")
    }; 
}

/**
 *  Add event listener for dark mode toggle to button and window. This code
 *  executes when window is loaded. 
 */
window.onload = () => {
    document.getElementById("darkModeToggle").addEventListener("click", () => toggleDarkMode());
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => toggleDarkMode());
}