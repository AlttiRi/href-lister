import {defineConfig} from "vite";
import vuePlugin from "@vitejs/plugin-vue";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname, "./src")
      }
    ]
  },
  plugins: [
    vuePlugin(),
  ],
  base: "./",
  server: {
    open: "./"
  },
  esbuild: {
    target: "es2021",
  },
  build: {
    target: "es2020",
    sourcemap: true,
    minify: true,
    rollupOptions: {
      preserveEntrySignatures: "strict",
      output: {
        compact: false,
        minifyInternalExports: false,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`,
        manualChunks: {
          "vue":  ["vue"],
          "util": ["@alttiri/string-magic", "@alttiri/util-js"],
          "idb":  ["idb-keyval"],
        },
      }
    }
  }
});
