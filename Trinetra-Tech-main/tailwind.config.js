// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx}', // Include all your JS/JSX/TSX files
  ],
  theme: {
    extend: {
      colors: {
        'navbar-dark-blue': '#001f3d', // Default dark blue for navbar
        'navbar-blue-light': '#003366', // Lighter shade of blue
        'navbar-blue-dark': '#000d1a', // Darker shade of blue
      },
      animation: {
        slosh: 'sloshing 4s ease-in-out infinite',
        marquee: 'marquee 15s linear infinite',
      },
      scrollBehavior: ['responsive', 'hover', 'focus'],
      keyframes: {
        sloshing: {
          '0%': { transform: 'translateX(-5%)' },
          '50%': { transform: 'translateX(5%)' },
          '100%': { transform: 'translateX(-5%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
