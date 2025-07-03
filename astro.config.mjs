// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import webpConverter from "./integrations/webp-converter.js";

// https://astro.build/config
export default defineConfig({
  site: "https://vallejosgroup.github.io",
  base: "/",
  integrations: [webpConverter()],
  vite: {
    plugins: [tailwindcss()],
  },
});
