import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  base: "/", // Keep this as '/' unless deployed under a subpath
  server: {
    host: "0.0.0.0", // Expose the server to the network
    port: 8080,      // Ensure the port matches the App Platform settings
  },
  build: {
    outDir: "dist", // Output directory for production build
    rollupOptions: {
      input: "index.html", // Specify entry point explicitly if needed
    },
  },
}));
