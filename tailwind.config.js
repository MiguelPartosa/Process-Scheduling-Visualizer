/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/ui/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [],
    prefix: 'tw-',
    // so that css doesn't get overriden
};
