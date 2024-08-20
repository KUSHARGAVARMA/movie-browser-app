/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',  // This specifies the paths where Tailwind should look for class names.
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'custom-gradient': 'linear-gradient(180deg, #1C124A, #2C1878)', // Example gradient using primary colors
      }),
  
        screens: {
          'sm': '640px',
          'md': '768px',
          'lg': '1024px',
          'xl': '1280px',
        },
      
      
      colors: {
        primary: {
          darkest: '#1C124A',
          dark: '#2C1878',
          DEFAULT: '#5A3DFF',
          light: '#8369FF',
          lighter: '#AEA7FF',
          lightest: '#D8D4FF',
        },
        secondary: {
          darkest: '#00214D',
          dark: '#00367A',
          DEFAULT: '#0077FF',
          light: '#339BFF',
          lighter: '#66BFFF',
          lightest: '#99E3FF',
        },
        success: {
          darkest: '#00432E',
          dark: '#00664A',
          DEFAULT: '#00A76A',
          light: '#33C091',
          lighter: '#66D9B7',
          lightest: '#99F2DD',
        },
        error: {
          darkest: '#590F1D',
          dark: '#841825',
          DEFAULT: '#E03D44',
          light: '#E85A60',
          lighter: '#F29698',
          lightest: '#FAD2D4',
        },
        warning: {
          darkest: '#5C3C00',
          dark: '#9C6A00',
          DEFAULT: '#FF9F00',
          light: '#FFB933',
          lighter: '#FFD366',
          lightest: '#FFE699',
        },
        neutral: {
          black: '#000000',
          gray: '#7A7A7A',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],  // Default font family set to Poppins.
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),  // Typography plugin for enhanced text styling.
  ],
};

