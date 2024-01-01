import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});

// import { defineConfig, loadEnv } from "vite";
// import react from "@vitejs/plugin-react";

// export default defineConfig(async ({ command, mode }) => {
//   // Load environment variables
//   const env = loadEnv(mode, process.cwd(), "");

//   return {
//     mode: mode,
//     plugins: [react()],

//     // Define global variables
//     define: {
//       __APP_ENV__: JSON.stringify(env.APP_ENV),
//     },

//     // Production build optimizations
//     build: {
//       sourcemap: false, // Set to true if you need source maps in production
//       minify: "terser",
//       assetsDir: "assets", // or use hash: true for cache busting
//     },

//     // Adjust server configurations for production
//     server: {
//       host: "localhost",
//       port: 5173,
//     },

//     // Optionally, set base path if your app is served from a subdirectory
//     // base: "/your-subdirectory/",
//   };
// });
