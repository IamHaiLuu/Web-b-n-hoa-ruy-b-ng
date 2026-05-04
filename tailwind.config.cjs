const forms = require('@tailwindcss/forms');

module.exports = {
  content: ['./views/**/*.pug', './src/**/*.js', './public/js/**/*.js'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Be Vietnam Pro', 'Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Be Vietnam Pro', 'system-ui', 'sans-serif']
      },
      colors: {
        cream: {
          50: '#FFFDF9',
          100: '#FFF8F7',
          200: '#F8EFEF'
        },
        rosePastel: {
          100: '#FCE7EC',
          200: '#F6B8C6',
          300: '#EE9DAF'
        },
        lavender: {
          100: '#F1E8FB',
          200: '#D9C2F0'
        },
        mint: {
          100: '#E4F6F1',
          200: '#BFE7DD'
        },
        textMain: '#3F3434',
        textSoft: '#8A7777',
        borderSoft: '#F1DCDC',
        primary: '#81505d'
      },
      boxShadow: {
        soft: '0 18px 50px rgba(63, 52, 52, 0.08)',
        card: '0 12px 30px rgba(63, 52, 52, 0.06)'
      },
      borderRadius: {
        '3xl': '1.5rem',
        '4xl': '2rem'
      }
    }
  },
  plugins: [forms]
};
