export default [
  {
    // Target files or patterns
    files: ["*.js", "*.ts"],

    // Rules can go here
    rules: {
      "no-console": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "single"]
    },

    // Optional: add plugins
    plugins: ["prettier"],

    // Optional: extend configs
    extends: ["eslint:recommended", "plugin:prettier/recommended"]
  }
];
