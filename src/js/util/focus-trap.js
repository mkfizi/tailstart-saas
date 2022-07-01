class FocusTrap{
    activeObject = null;    // Object which triggers backdrop 
    firstElement = null;    // First focusable element
    lastElement = null;     // Last focusable element

    /**
     * FocusTrap constructor.
     * @params (class) activeObject
     */
    constructor(activeObject) {
        this.activeObject = activeObject;

        this.initializeActiveObject()
        this.initializeFocusableElement()

        document.addEventListener("keydown", this);
    }
    
    /**
     * FocusTrap destructor.
     */
    destructor() {
        document.removeEventListener("keydown", this);
    }

    /**
     * FocusTrap event handler.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.type === "keydown" && event.keyCode === 9) {
            if (event.shiftKey && document.activeElement === this.firstElement) {
                event.preventDefault();
                this.lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === this.lastElement) {
                event.preventDefault();
                this.firstElement.focus();
            }
        }
    }
    
    /**
     * Initialize active object attributes.
     */
    initializeActiveObject() {
        this.activeObject.container.setAttribute("tabindex", 0);
        this.activeObject.container.focus();
        setTimeout(() => { this.activeObject.container.removeAttribute("tabindex"); }, 1000);
    }
    
    /**
     * Initialize focusable elements.
     */
    initializeFocusableElement() {
        let focusableElements = this.activeObject.container.querySelectorAll("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex=\"0\"], [contenteditable]"); 
        this.firstElement = focusableElements[0];
        this.lastElement = focusableElements[focusableElements.length - 1];
    }
}

export default FocusTrap;