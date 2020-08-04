
module.exports = {
  purge: {
    enabled: false,//process.env.MODE === 'production' ? () => { console.log(process.env.MODE); return true} : () => { console.log(process.env.MODE); return false},
    content: [
      "./index.html",
      "./src/**/*.html",
      "./src/**/*.vue",
      "./src/**/*.jsx"
    ]
  },
  theme: {
    extend: {
      fontFamily: {
        julie: ["Caveat", "cursive"],
      },
      minWidth: {
        "100": "100px"
      },
      minHeight: {
        "16": "4rem",
        "14": "3.5rem",
        "12": "3rem"
      },
      boxShadow: {
        "2xl-center": "0 15px 50px -12px rgba(0, 0, 0, 0.25);",
        "xl-center": "0 0px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        neuro1: "7px 7px 10px rgba(0, 0, 0, 0.1), -7px -7px 10px #ffffff",
        neuro2: "inset 5px 5px 10px #dae0e6, inset -5px -5px 7px #ffffff",
        "neuro-btn": "4px 4px 9px #dae0e6, -4px -4px 7px #ffffff",
        "neuro-btn-active":
          "inset 4px 4px 9px #dae0e6, inset -4px -4px 7px #ffffff",
      },
      borderRadius: {
        xxl: "1rem",
      },
      colors: {
        gray: {
          "100": "#edf3fa",
          "200": "#e6edf5",
          "300": "#e4edf6",
          "400": "#bdbdbd",
          "500": "#9e9e9e",
          "600": "#757575",
          "700": "#616161",
          "800": "#424242",
          "900": "#212121",
        },
        primary: "rgba(var(--primary-color), var(--primary-alpha))",
        secondary: "var(--color-secondary)",
      },
    },
  },
  variants: {
    width: ["responsive", "hover", "focus"],
    backgroundColor: ["responsive", "hover", "focus", "group-hover"],
    visibility: ["responsive", "group-hover"],
    zIndex: ["responsive", "hover"],
    borderStyle: ['responsive', 'hover'],
    borderWidth: ['responsive', 'hover'],

  },
  corePlugins: {
    container: false,
  },
  plugins: [],
};
