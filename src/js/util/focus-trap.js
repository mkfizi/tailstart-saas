class FocusTrap{
    constructor(container) {
        this.container = container;

        this.container.setAttribute("tabindex", 0);
        setTimeout(() => { this.container.removeAttribute("tabindex"); }, 1000);
        this.container.focus();

        let focusableElements = this.container.querySelectorAll("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex=\"0\"], [contenteditable]"); 
        this.firstElement = focusableElements[0];
        this.lastElement = focusableElements[focusableElements.length - 1];

        this.initialize();
    }

    initialize() {
        document.addEventListener("keydown", this);
    }

    destroy() {
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