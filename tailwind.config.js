/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    darkMode: "class",
    theme: {
        container: {
            center: true,
            padding: "1rem",
        },
        screens: {
            xs: "450px",
            // sm: "575px", // defaults
            // md: "768px",
            // lg: "992px",
            // xl: "1200px",
            "2xl": "1400px",
        },
        extend: {
            colors: {
                current: "currentColor",
                transparent: "transparent",
                white: "#ffffff",
                black: "#121723",
                dark: "#1d2430",
                primary: "#4a6cf7",
                yellow: "#fbb040",
                "bg-color-dark": "#171c28",
                "body-color": {
                    DEFAULT: "#788293",
                    dark: "#959cb1",
                },
                stroke: {
                    stroke: "#e3e8ef",
                    dark: "#353943",
                },
                gray: {
                    50: "#f9fafb",
                    100: "#f3f4f6",
                    200: "#e5e7eb",
                    300: "#d1d5db",
                    400: "#9ca3af",
                    500: "#6b7280",
                    600: "#4b5563",
                    700: "#374151",
                    800: "#1f2937",
                    900: "#111827",
                    950: "#030712",
                    dark: "#1e232e",
                    light: "#f0f2f9",
                },
            },
            boxShadow: {
                "sign-up": "0px 5px 10px rgba(4, 10, 34, 0.2)",
                one: "0px 2px 3px rgba(7, 7, 77, 0.05)",
                two: "0px 5px 10px rgba(6, 8, 15, 0.1)",
                three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
                sticky: "inset 0 -1px 0 0 rgba(0, 0, 0, 0.1)",
                "sticky-dark": "inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)",
                "feature-2": "0px 10px 40px rgba(48, 86, 211, 0.12)",
                submit: "0px 5px 20px rgba(4, 10, 34, 0.1)",
                "submit-dark": "0px 5px 20px rgba(4, 10, 34, 0.1)",
                btn: "0px 1px 2px rgba(4, 10, 34, 0.15)",
                "btn-hover": "0px 1px 2px rgba(0, 0, 0, 0.15)",
                "btn-light": "0px 1px 2px rgba(0, 0, 0, 0.1)",
            },
            dropShadow: {
                three: "0px 5px 15px rgba(6, 8, 15, 0.05)",
            },
        },
    },
    plugins: [],
};
