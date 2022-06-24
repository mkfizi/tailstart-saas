class Navbar {
    constructor(element) {
        this.container = element;
        this.toggle(this.container)
        window.onscroll = () => {this.toggle(this.container)};
    }

    toggle(element) {
        window.pageYOffset > (element.offsetHeight - element.clientHeight)
        ? element.classList.add('bg-white', 'dark:bg-gray-800', 'shadow-md')
        : element.classList.remove('bg-white', 'dark:bg-gray-800', 'shadow-md');
    }
}

export default () => {
    let components = document.querySelectorAll("[data-component='Navbar']");
    for (let i = 0; i < components.length; i++){
        new Navbar(components[i]);
    }
}