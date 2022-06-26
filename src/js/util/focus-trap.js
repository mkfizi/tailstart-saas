class FocusTrap {
    constructor(element) {
        element.setAttribute("tabindex", 0);
        setTimeout(() => { element.removeAttribute("tabindex"); }, 1000);
        element.focus();

        let focusableElements = element.querySelectorAll("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex=\"0\"], [contenteditable]");
        
        this.firstElement = focusableElements[0];
        this.lastElement = focusableElements[focusableElements.length - 1];
        this.activate();
    }

    activate() {
        document.addEventListener("keydown", this);
    }

    deactivate() {
        document.removeEventListener("keydown", this);
    }

    handleEvent(event) {
        if (event.keyCode === 9) {
            if (event.shiftKey && document.activeElement === this.firstElement) {
                event.preventDefault();
                this.lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === this.lastElement) {
                event.preventDefault();
                this.firstElement.focus();
            }
        }
    }
}

export default FocusTrap;