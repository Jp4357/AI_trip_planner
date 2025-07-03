import type { Config } from 'tailwindcss'

const config: Config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class', // This is crucial - must be 'class' not 'media'
    theme: {
        extend: {
            // You can add custom theme extensions here
        },
    },
    plugins: [],
}

export default config