module.exports = {
  content: [
    './src/**/*.twig',
  ],
  theme: {
    fontFamily: {
      header: ['Be Vietnam Pro Medium', 'sans-serif'],
      tagline: ['Be Vietnam Pro Medium', 'sans-serif'],
      subtitle: ['Be Vietnam Pro Normal', 'sans-serif'],
      menu: ['Work Sans Medium', 'sans-serif'],
      button: ['Work Sans Medium', 'sans-serif'],
      body: ['Be Vietnam Pro Light', 'sans-serif'],
    },
    screens: {
      'xs': '343px',
      // => @media (min-width: 480px) { ... }
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    dropShadow: {
      '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
      '4xl': '0 45px 65px rgba(0, 0, 0, 0.15)',
    },
    extend: {
      colors: {
        'primary': '#ffd74a',
        'secondary': '#36393e',
        'accent': '#ffd74a',
        'header': '#00153e',
        'base': '#25292d',
        'gray': '#969696',
        'light': '#f7f7f7',
        'dark': '#16191d',
        'white': '#ffffff'
      },
      padding: {
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      margin: {
        '14': '3.5rem',
        '16': '4rem',
        '20': '5rem',
        '24': '6rem',
      },
      height: {
        '300': '300px',
        '350': '350px',
        '400': '400px',
        '450': '450px',
        '500': '500px',
        '550': '550px',
        '600': '600px',
        '650': '650px',
        '700': '700px',
        '750': '750px',
        '800': '800px',
        '850': '850px',
        '900': '900px',
        '950': '950px',
        '1000': '1000px',
      },
      zIndex: {
        '5': '5',
      },
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}