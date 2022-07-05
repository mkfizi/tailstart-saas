class ClickOutside{
    targetObject = null;    // Object which triggers click outside

    /**
     * ClickOutside constructor.
     * @params (class) targetObject
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
        if (event.type == "click" && this.isOutside(event)) this.targetObject.hide();
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
    isOutside(event) {
        let isOutside = true;
        if (this.targetObject.element.contains(event.target)) isOutside = false;
        this.targetObject.buttons.forEach(element => {
            if (element == event.target.closest(`[data-trigger="${this.targetObject.constructor.name}"][data-target="${this.targetObject.id}"]`)) isOutside = false;
        });
        
        return isOutside;
    }
}

export default ClickOutside;