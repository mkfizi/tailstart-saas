class ClickOutside{
    targetObject = null;    // Object which triggers click outside

    /**
     * ClickOutside constructor.
     * @params (class) activeObject
     */
    constructor(targetObject) {
        this.setTargetObject(targetObject);
    }
    
    /**
     * ClickOutside destructor.
     */
    destructor() {
        this.targetObject = null;
        document.removeEventListener("click", this);
    }

    /**
     * ClickOutside event handler.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.type == "click") {
            if (this.isTargetOutside(event)) this.targetObject.hide();
        }
    }

    /**
     * Set target object property.
     * @parans (object) targetObject
     */
    setTargetObject(targetObject) {
        this.targetObject = targetObject;

        document.addEventListener("click", this);
    }

    /**
     * Check if click target is outside of component or component trigger.
     * @params (object) event
     * @return (boolean) isOutside
     */
    isTargetOutside(event) {
        let isTargetOutside = true;

        this.targetObject.buttons.forEach(element => {
            if (element == event.target.closest(`[data-trigger="dropdown"][data-target="${this.targetObject.id}"]`)) isTargetOutside = false;
        });
        if (this.targetObject.element.contains(event.target)) isTargetOutside = false;
        
        return isTargetOutside;
    }
}

export default ClickOutside;