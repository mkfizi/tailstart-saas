class Backdrop {
    element = null;         // Backdrop element
    activeObject = null;    // Object which triggers backdrop 

    /**
     * Backdrop constructor.
     * @params (class) activeObject
     */
    constructor(activeObject) {
        if (this.activeObject != null) this.hide();
        this.activeObject = activeObject;

        this.setElement();
        this.show();
    }

    /**
     * Backdrop destructor.
     */
    destructor() {
        this.activeObject = null;
        this.element.remove();
    }
    
    /**
     * Handle event.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.type == "click") this.hide();
    }

    /**
     * Show backdrop.
     */
    show() {
        this.activeObject.element.parentNode.insertBefore(this.element, this.activeObject.element);
    }

    /**
     * Hide backdrop where it trigger hide method on current active object.
     */
    hide() {
        this.activeObject.hide();
    }

    /**
     * Set element for backdrop.
     */
    initializeelement() {
        let element = document.createElement("div");
        this.element = element;
        this.element.setAttribute("class", "fixed w-screen h-screen bg-neutral-900 opacity-50 z-10 transition top-0 left-0");
        this.element.addEventListener("click", this)
    }
}

export default Backdrop;