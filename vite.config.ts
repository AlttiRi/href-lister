import {defineConfig, splitVendorChunkPlugin} from "vite";
import vuePlugin from "@vitejs/plugin-vue";


export default defineConfig({
  server: {
    open: "./"
  },
  plugins: [
    vuePlugin(),
    splitVendorChunkPlugin(),
  ],
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
