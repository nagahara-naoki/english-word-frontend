import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        color_white: "#eaeaea",
        // color_white: "#F5F5F5",
        color_green: "#065F46",
        color_red: "#EF4444",
        color_blue: "#1E3A8A",
        color_orange: "#F97316",
        custom_border: "rgba(255, 255, 255, 0.5)",
      },

      extend: {
        animation: {
          bounce: "bounce 1s infinite", // カスタムアニメーションを追加
        },
        keyframes: {
          bounce: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-20px)" }, // 上に20px移動
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
