import { defineConfig } from 'vite'

import nodeExternals from 'rollup-plugin-node-externals'

import pkg from './package.json';

const exportKeys = Object.keys(pkg.exports);

const aliasMap = exportKeys.reduce((acc, current) => {
  return {
    ...acc,
    [`${pkg.name}/${current.replace('./', '')}`]: pkg.exports[current].import.replace('./dist/', './src/').replace('.mjs', '.ts'),
  }
}, {});

export default defineConfig({
  build: {
    cssCodeSplit: true,
    minify: false,
    sourcemap: false,
    lib: {
      entry: [
        // root entrypoints
        './src/index.ts',
        './src/styles.scss',
        // button entrypoints
        './src/components/button/index.ts',
        './src/components/button/styles.scss',
        // icon entrypoints
        './src/components/icon/index.ts',
        './src/components/icon/styles.scss',
      ],
      formats: ['es'],
    },
    rollupOptions: {
        output: {
            preserveModules: true,
            preserveModulesRoot: 'src',
        },
    },
  },
  plugins: [nodeExternals()],
  resolve: {
    alias: aliasMap,
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        silenceDeprecations: ['import']
      },
    },
  }
})