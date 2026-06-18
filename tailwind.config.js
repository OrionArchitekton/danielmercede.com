/** @type {import('tailwindcss').Config} */
// Bundled Tailwind config — replaces the production `cdn.tailwindcss.com`
// in-browser JIT compiler (a ~123KB-gzip render-blocking script that recompiled
// CSS on every page load). Mirrors the inline `tailwind.config` that previously
// lived in index.html so the utility set and custom tokens are unchanged; Vite
// now emits a compiled stylesheet at build time.
export default {
  // Include the build-time body-bake source (scripts/bakeBody.mjs) so classes
  // used only in the baked crawler/pre-hydration markup are not purged from the
  // compiled stylesheet.
  content: ['./index.html', './index.tsx', './App.tsx', './constants.ts', './components/**/*.{ts,tsx}', './scripts/**/*.mjs'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Lora', 'serif'],
      },
      colors: {
        neutral: {
          850: '#1f1f1f',
          900: '#171717',
        },
      },
    },
  },
  plugins: [],
};
