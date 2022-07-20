# Tailboard

Tailboard is a TailwindCSS admin dashboard panel with built-in components.

[View Demo](https://mkfizi.github.io/tailboard)

## Installation

Use git command to download Tailboard:
```bash 
git clone https://github.com/mkfizi/tailboard.git project-name
```
`project-name` is the name of your project's directory.

Use NPM CLI command to install TailwindCSS dependancies:
```bash
npm install
```

Use built-in CLI command to build CSS file with TailwindCSS classes.
```bash
npm run tailwind-watch
```

If you never heard of NPM before, this is the best time to start using it since
modern web development work best with NPM. Refer here for more informations:
[NPM](https://www.npmjs.com/)

That's it. You may begin develop your project with Tailboard. Dont forget to
remove `.git` folder and then run `git init` should you want to push commits to
your own repository.

## Usage

Tailboard is designed to be used on web applications or sites that requires an
admin dashboard panel. It eliminates the process of setting up base 
configurations for project that uses TailwindCSS.

Tailboard does not include bundler tools such as `webpack` or `parcel` since we
want it to be adaptable with any development stacks.

Tailboard can be further customize and integrated with any frameworks according
to your project's requirement.

You may refer here for more information about Tailboard's directory structure:
[Tailboard Directory](./DIRECTORY.md)

# Features

Tailboard include some features as below.

### Built-in Components

Tailboard include some built-in components for rapid development using minimal
implementation using vanilla Javascript. These components consist as below:

* Alert
* Collapse
* Dropdown
* Modal
* Dropdown

### Built-in CLI Command

Tailboard include some built-in NPM CLI commands which purpose is to build CSS
file containing TailwindCSS classes that are present in the project. These 
commands consists as below:

* `npm run tailwind` ─ Run Tailwind CLI and build CSS.
* `npm run tailwind-watch` ─ Run Tailwind CLI and build CSS in watch mode.
* `npm run tailwind-build` ─ Run Tailwind CLI and build CSS for production.

These commands are declared in `package.json` and can be customize according to
project's path preferences.

### Dark Mode Toggle

Tailboard include a dark mode toggle built using vanilla Javascript which 
utilizes dark mode feature in TailwindCSS. 

Dark mode theme switches between value of `theme` key stored in browser's local
storage. If the key is not existed when the site is loaded for the first time, 
dark mode theme will uses value according to device's current theme setting.

You may customize dark mode scripts located in `app.js` that suits your need.

### Viewport Fix for Mobile Browsers

Tailboard include a fix for the notorious [viewport issue on mobile browsers](https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser)
where it calculate the actual browser's viewport and append the value on
targeted classes that use 'vh' unit on it's properties.

Targeted classes are defined in `tailwind.config.js` by adding `calc(var(--vh, 1vh) * [number])`
on defined properties where `[number]` is the number of the viewport height. 
By default Tailboard append this value on `min-h-screen` and `h-screen` classes.

Here is an on how to extend this feature on other existing or custom classes
that uses 'vh' unit on it's properties:
```
//tailwind.config.js
...
theme: {
    extend: {
        height: {
            "xl": ["50vh", "calc(var(--vh, 1vh) * 50)"],
        }
    }
}
...

// CSS output
.h-xl{
    height: 50vh // Fallback value
    height: calc(var(--vh, 1vh) * 50) // This is equivalent to 50vh
}
```

Refer here on how to further customize `tailwind.config.js`:
[TailwindCSS Theme Configuration](https://tailwindcss.com/docs/theme)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to
discuss what you would like to change.

Please make sure to update tests as appropriate.

## Special Thanks

This project is hugely inspired by 
[Windmill Dashboard](https://windmill-dashboard.vercel.app/).

Icons used are from [Tabler Icons](https://tablericons.com/).

And thank you [@adamwathan](https://twitter.com/adamwathan) for creating
TaildwindCSS!

## License
[MIT](https://choosealicense.com/licenses/mit/)