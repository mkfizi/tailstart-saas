class Navbar {
    constructor(element) {
        window.onscroll = () => {this.toggle(element)};
        this.toggle(element)
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