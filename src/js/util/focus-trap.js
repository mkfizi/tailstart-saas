class FocusTrap{
    targetObject = null;    // Object which triggers backdrop 
    firstElement = null;    // First focusable element
    lastElement = null;     // Last focusable element

    /**
     * FocusTrap constructor.
     * @params (class) targetObject
     */
    constructor(targetObject) {
        this.setTargetObject(targetObject);
        this.setFocusableElement();
    }
    
    /**
     * FocusTrap destructor.
     */
    destructor() {
        this.targetObject = null;
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
     * Set active object attributes.
     * @oarans (object) targetObject
     */
    setTargetObject(targetObject) {
        this.targetObject = targetObject;
        this.targetObject.element.setAttribute("tabindex", 0);
        this.targetObject.element.focus();
        setTimeout(() => { this.targetObject.element.removeAttribute("tabindex"); }, 1000);

        document.addEventListener("keydown", this);
    }
    
    /**
     * Set focusable elements.
     */
    setFocusableElement() {
        let focusableElements = this.targetObject.element.querySelectorAll("a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, [tabindex=\"0\"], [contenteditable]"); 
        this.firstElement = focusableElements[0];
        this.lastElement = focusableElements[focusableElements.length - 1];
    }
}

export default FocusTrap;