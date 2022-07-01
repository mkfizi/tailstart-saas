class Backdrop {
    container = null;       // Backdrop element
    activeObject = null;    // Object which triggers backdrop 

    /**
     * Backdrop constructor.
     * @params (class) activeObject
     */
    constructor(activeObject) {
        if (this.activeObject != null) this.hide();
        this.activeObject = activeObject;

        this.initializeContainer();

        this.show();
    }

    /**
     * Backdrop destructor.
     */
    destructor() {
        this.activeObject = null;
        this.container.remove();
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
        this.activeObject.container.parentNode.insertBefore(this.container, this.activeObject.container);
    }

    /**
     * Hide backdrop where it trigger hide method on current active object.
     */
    hide() {
        this.activeObject.hide();
    }

    /**
     * Initialize container for backdrop.
     */
    initializeContainer() {
        let container = document.createElement("div");
        this.container = container;
        this.container.setAttribute("class", "fixed w-screen h-screen bg-neutral-900 opacity-50 z-10 transition top-0 left-0");
        this.container.addEventListener("click", this)
    }
}

export default Backdrop;