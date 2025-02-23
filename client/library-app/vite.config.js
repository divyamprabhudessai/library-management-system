import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import postcssConfig from "./postcss.config.cjs";


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
