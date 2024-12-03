import { defineConfig } from 'vite'

import dts from 'vite-plugin-dts'

import nodeExternals from 'rollup-plugin-node-externals'
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      entry: [
        './src/index.ts',
        './src/styles.scss',
        './src/components/button/index.ts',
        './src/components/button/styles.scss',
        './src/components/icon/index.ts',
        './src/components/icon/styles.scss',
      ],
      formats: ['es'],
      // fileName: (format, entryName) => `my-lib-${entryName}.${format}.js`,
    },
    rollupOptions: {
        output: {
            preserveModules: true,
            preserveModulesRoot: 'src',
        },
    },
  },
  plugins: [nodeExternals(), dts()],
})