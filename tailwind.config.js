module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      gridTemplateColumns: {
        'custom': '1fr 350px',
      },
    }
  },
  plugins: [],
}
