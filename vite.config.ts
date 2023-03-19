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
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  }
});
