class FocusTrap {
    constructor() {}

    static trigger(element) {
        this.trapElement = element;
        this.focusableElements = this.trapElement.querySelectorAll("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex=\"0\"], [contenteditable]");
        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];  
        this.trapElement.setAttribute("tabindex", 0);
        setTimeout(() => { this.trapElement.removeAttribute("tabindex"); }, 1000);
        this.trapElement.focus();
        this.activate();
    }


    static activate() {
        document.addEventListener("keydown", eventHandler);
    }

    static deactivate() {
        document.removeEventListener("keydown", eventHandler);
    }
}



const eventHandler = (event) => {
    if (event.keyCode === 9) {
        if (event.shiftKey && document.activeElement === FocusTrap.firstFocusableElement) {
            event.preventDefault();
            FocusTrap.lastFocusableElement.focus();
        } else if (!event.shiftKey && document.activeElement === FocusTrap.lastFocusableElement) {
            event.preventDefault();
            FocusTrap.firstFocusableElement.focus();
        }
    }
}

new FocusTrap();

export default FocusTrap;