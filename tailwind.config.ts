import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    // Note: don't allow extend colors.
    colors: {
      primary: '#17192D',
      secondary: '#023B78',
      selection: '#2188FF',
      accent: '#ffc107',
      success: '#52C41A',
      danger: '#ED3833',
      // TODO: implemente "warning" & "info" colors.
    },
  },
  plugins: [],
};
export default config;
