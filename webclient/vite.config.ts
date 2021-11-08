import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactCssModule from "vite-plugin-react-css-modules";
const generateScopedName = "[name]__[local]___[hash:base64:5]";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), reactCssModule({
        generateScopedName,
        filetypes: {
            ".less": {
                syntax: "postcss-less",
            },
        },
    })],
    css: {
        modules: {
            generateScopedName,
        },
    }
});
