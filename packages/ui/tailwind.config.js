import('tailwindcss').Config;

export default {
    content: [
        "./apps/**/*.{js,jsx,ts,tsx}",
        "./packages/ui/**/*.{js,jsx,ts,tsx}"
    ],
    theme: {
        extend: {},
    },
    plugins: [],
};