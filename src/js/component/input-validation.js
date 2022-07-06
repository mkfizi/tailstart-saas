import {setComponentByQuery, setValidationText} from "../util/config.js";

class InputValidation{
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

        if(this.element.checkValidity()) {
            if (this.element.dataset.valid != null) this.validationText.innerHTML = this.element.dataset.valid;
        } else {
            if (this.element.dataset.invalid != null) this.validationText.innerHTML = this.element.dataset.invalid;
        }

        this.element.parentNode.insertBefore(this.validationText, this.element.nextSibling);
    }

    /**
     * Hide input validation.
     */
    hide() {
        this.validationText.remove();
        this.validationText = null;
    }
}

const selector = "[required]";
const object = InputValidation;

export const inputValidations = setComponentByQuery(selector, object);

export default InputValidation;