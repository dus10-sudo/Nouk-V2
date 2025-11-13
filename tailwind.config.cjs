/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Nouk parchment palette
        nouk: {
          bg: "#F3E9D9",        // page parchment
          card: "#F6EDDF",      // card parchment (slightly lighter)
          ink: "#3C322B",       // primary text
          mute: "#7B6D63",      // secondary text
          edge: "#E7DCCB",      // card border/edge
          shadow: "#E1D4C2",    // soft card shadow
          action: "#C97352",    // “Share a Thought” fill
          actionText: "#FFFFFF"
        }
      },
      boxShadow: {
        nouk: "0 2px 0 0 #E1D4C2, 0 10px 24px -12px rgba(0,0,0,0.12)"
      },
      borderRadius: {
        nouk: "1.25rem" // ~20px
      },
      fontSize: {
        'display': ["40px", { lineHeight: "44px", letterSpacing: "-0.02em" }]
      }
    },
    fontFamily: {
      display: ['"Playfair Display"', "serif"],
      sans: ['Inter', "system-ui", "Segoe UI", "Roboto", "Arial", "sans-serif"]
    }
  },
  plugins: []
};
