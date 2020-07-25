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
        down: "inset 0 1px 5px 0 rgba(0, 0, 0, 0.3)",
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
        primary: "var(--color-primary)",
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
