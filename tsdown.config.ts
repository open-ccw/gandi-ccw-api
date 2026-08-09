import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  sourcemap: true,
  minify: false,
  deps: {
    neverBundle: ["@open-ccw/scratch-vm"],
  },
  outDir: "dist",
});
