class Backdrop {
    constructor(object) {
        this.activeObject = object;
        
        let container = document.createElement("div");
        container.setAttribute("class", "fixed w-screen h-screen bg-neutral-900 opacity-50 z-10 transition top-0 left-0");

        this.container = container;
        this.initialize();
    }

    initialize() {
        this.show();
        this.container.addEventListener("click", this)
    }

    handleEvent() {
        this.hide();
    }

    show() {
        this.activeObject.container.parentNode.insertBefore(this.container, this.activeObject.container);
    }

    hide() {
        this.container.remove();
        this.activeObject.hide();
    }
}

export default Backdrop;