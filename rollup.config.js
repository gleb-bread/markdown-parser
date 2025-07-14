import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/esm',
      format: 'esm'
    },
    plugins: [
      typescript({ outDir: 'dist/esm' }),
      terser()
    ]
  },
  {
    input: 'src/index.ts',
    output: {
      dir: 'dist/cjs',
      format: 'cjs'
    },
    plugins: [
      typescript({ outDir: 'dist/cjs' }),
      terser()
    ]
  }
];