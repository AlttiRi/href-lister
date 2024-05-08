import {defineConfig, splitVendorChunkPlugin} from "vite";
import vuePlugin from "@vitejs/plugin-vue";


export default defineConfig({
  plugins: [
    vuePlugin(),
    splitVendorChunkPlugin(),
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
      }
    }
  }
});
