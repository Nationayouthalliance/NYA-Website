import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import history from 'connect-history-api-fallback';
import type { Plugin } from 'vite';

// https://vitejs.dev/config/
function spa404Plugin(): Plugin {
  return {
    name: 'spa-404-fallback',
    configureServer(server) {
      server.middlewares.use(
        history({
          disableDotRule: true,
          htmlAcceptHeaders: ["text/html", "application/xhtml+xml"],
          rewrites: [
            { from: /./, to: '/index.html' }
          ]
        })
      );
    },
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
