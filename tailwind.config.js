module.exports = {
    purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
    theme: {
      extend: {
        fontFamily: {
          julie: ["Caveat", "cursive"]
        },
        minHeight: {
          "14": "3.5rem"
        },
        boxShadow: {
          down: "inset 0 1px 5px 0 rgba(0, 0, 0, 0.3)"
        },
        colors: {
          primary: 'var(--color-primary)',
          secondary: 'var(--color-secondary)',
        }
      },
    },
    variants: {
      backgroundColor: ['responsive', 'hover', 'focus', 'group-hover'],
      visibility: ['responsive', 'group-hover'],
      zIndex: ['responsive', 'hover'],
    },
    corePlugins: {
      container: false,
    },
    plugins: [],
  }
  