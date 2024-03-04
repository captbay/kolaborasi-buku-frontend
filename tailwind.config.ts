/** @type {import('tailwindcss').Config} */

import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primaryColor: "#18415F",
        whiteColor: "#F8F9FA",
        blackColor: "#232323",
        disableColor: "#6b7280",
        dangerColor: "#ef4444",

        hoverColor: "#0f2a3d",

        primaryCard: "#edf4fa",
        primaryBorder: "#e5e7eb",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
export default config;
