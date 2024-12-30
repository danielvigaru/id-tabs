import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: [
        {
            file: 'lib/index.mjs',
            format: 'es',
        },
        {
            file: 'lib/index.umd.js',
            format: 'umd',
            name: 'IdTabs',
        },
    ],
    plugins: [typescript(), terser()],
};
