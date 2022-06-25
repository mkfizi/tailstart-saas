class FocusTrap {
    constructor(element) {
        this.trapElement = element;
        this.focusableElements = this.trapElement.querySelectorAll("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex=\"0\"], [contenteditable]");
        this.firstFocusableElement = this.focusableElements[0];
        this.lastFocusableElement = this.focusableElements[this.focusableElements.length - 1];
        
        this.trapElement.setAttribute("tabindex", 0);
        setTimeout(() => { this.trapElement.removeAttribute("tabindex"); }, 1000);
        this.trapElement.focus();
    }

    activate() {
        document.addEventListener("keydown", handleKeyDown);
    }

    deactivate() {
        document.removeEventListener("keydown", handleKeyDown);
    }
}

const handleKeyDown = (event) => {
    if (event.keyCode === 9) {
        if (event.shiftKey && document.activeElement === window.focusTrap.firstFocusableElement) {
            event.preventDefault();
            window.focusTrap.lastFocusableElement.focus();
        } else if (!event.shiftKey && document.activeElement === window.focusTrap.lastFocusableElement) {
            event.preventDefault();
            window.focusTrap.firstFocusableElement.focus();
        }
    }
}

export default (element = document) => {
    if (element != document) {
        window.focusTrap = new FocusTrap(element);
        window.focusTrap.activate();
    } else {
        window.focusTrap.deactivate();
        window.focusTrap = null;
    }
};