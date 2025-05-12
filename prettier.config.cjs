/** @type {import("prettier").Config} */
module.exports = {
    plugins: [
      require.resolve("prettier-plugin-tailwindcss"),
      "@trivago/prettier-plugin-sort-imports",
      "prettier-plugin-unused-imports-configurable",
    ],
  };
  