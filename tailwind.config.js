module.exports = {
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        julie: ["Caveat", "cursive"],
      },
      minHeight: {
        "14": "3.5rem",
      },
      boxShadow: {
        neuro1: "7px 7px 14px #dae0e6, -7px -7px 10px #ffffff",
        neuro2: "inset 5px 5px 10px #dae0e6, inset -5px -5px 7px #ffffff",
        "neuro-btn": "4px 4px 9px #dae0e6, -4px -4px 7px #ffffff",
        "neuro-btn-active":
          "inset 4px 4px 9px #dae0e6, inset -4px -4px 7px #ffffff",
      },
      borderRadius: {
        xxl: "1.25rem",
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
  },
  corePlugins: {
    container: false,
  },
  plugins: [],
};
