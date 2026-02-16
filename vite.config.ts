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
    // viteSingleFile(), // for a single HTML file output
    // add import {viteSingleFile} from "vite-plugin-singlefile"; // comment "manualChunks" and "sourcemap"
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
        // manualChunks: {
        //   "vue":  ["vue"],
        //   "util": ["@alttiri/util-js", "@alttiri/string-magic", "@alttiri/popup-enhance"],
        //   "idb":  ["idb-keyval"],
        // },
        manualChunks: (id) => {
          if (id.includes("bootstrap"))   { return "bootstrap"; }
          if (id.includes("@vue")       ) { return "vue";  }
          if (id.includes("idb-keyval") ) { return "idb";  }
          if (id.includes("@alttiri")   ) { return "util"; }
        },
      }
    }
  }
});
