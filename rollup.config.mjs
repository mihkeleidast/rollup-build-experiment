import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import nodeExternals from 'rollup-plugin-node-externals'
import sass from 'rollup-plugin-sass';

export default {
  input: [
    './src/index.ts',
    './src/styles.scss',
    './src/components/button/index.ts',
    // does not work very well with multiple scss entrypoints?
    './src/components/button/styles.scss',
  ],
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    sourcemap: true,
  },
  jsx: 'react',
  plugins: [
    nodeExternals(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.build.json',
      declaration: true,
      outDir: 'dist',
    }),
    sass({
      output: 'dist/styles.css',
    }),
  ],
};