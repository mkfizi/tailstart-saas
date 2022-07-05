const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    mode: 'jit',
    darkMode: 'class',
    content: [
        "./*.html",
        "./src/**/*.{html,js}"
    ],
    theme: {	
        extend: {
            minHeight: {
                "screen": ["100vh", "calc(var(--vh, 1vh) * 100)"],
            },
            height: {
                "screen": ["100vh", "calc(var(--vh, 1vh) * 100)"],
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}
