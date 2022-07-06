import {setComponentByQuery, setValidationText} from "./config.js";

class RequiredValidation{
    element = null;         // Input Validation element
    validationText = null;  // Validation text element

    /**
     * InputValidation constructor.
     * @params (class) targetObject
     */
    constructor(element) {
        this.setComponent(element);
    }

    /**
     * InputValidation event handler.
     * @params (object) event
     */
    handleEvent(event) {
        if (event.type == "keyup") this.toggle();
    }

    /**
     * Toggle input validation.
     */
    toggle() {
        this.show();

        if (this.element.dataset.isValid != null) {
            if (this.element.dataset.isValid == "hide" && this.element.checkValidity()) this.hide();
        }
    }

    /**
     * Set input validation component.
     * @params (HTMLDom) element
     */
    setComponent(element) {
        this.element = element;
        this.element.addEventListener('keyup', this);
    }

    /**
     * Show input validation.
     */
    show() {
        if (this.validationText != null) this.hide();
        this.validationText = setValidationText(this.element.checkValidity());
        this.validationText.innerHTML = this.getValidationText();
        this.element.parentNode.insertBefore(this.validationText, this.element.nextSibling);
    }

    /**
     * Hide input validation.
     */
    hide() {
        this.validationText.remove();
        this.validationText = null;
    }
    
    /**
     * Get input validation text.
     * @returns (string) validationText
     */
    getValidationText() {
        let validationText = null;

        if(this.element.checkValidity()) {
            if (this.element.dataset.valid != null) validationText = this.element.dataset.valid;
        } else {
            if (this.element.dataset.invalid != null) validationText = this.element.dataset.invalid;
        }

        return validationText;
    }
}

const selector = "[required]";
const object = RequiredValidation;

export const requiredValidations = setComponentByQuery(selector, object);

export default RequiredValidation;