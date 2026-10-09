export default {
  plugins: {
    tailwindcss: {},
    'nativewind/postcss': {},
    'postcss-css-variables': {},
    'postcss-color-functional-notation': {},
    'postcss-calc': { warnWhenCannotResolve: true },
    'postcss-nested': { bubble: ['selector'] },
  },
};
