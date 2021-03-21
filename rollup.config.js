import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from '@rollup/plugin-babel';
import strip from '@rollup/plugin-strip';

import {dependencies, module, main, version} from './package.json';

import {terser} from 'rollup-plugin-terser';
import license from 'rollup-plugin-license';

export default [
    {
        input: 'src/index.js',
        output: {
            name: 'wilma',
            file: main,
            format: 'umd',
        },
        plugins: [
            strip({
                debugger: true,
                functions: ['console.log', 'console.debug', 'console.error'],
                sourceMap: true,
            }),
            json(),
            resolve(),
            commonjs(),
            babel({
                babelrc: false,
                exclude: 'node_modules/**',
                presets: ['@babel/env'],
            }),
            terser(),
            license({
                banner: `/*!
* wilma-js v${version}
* (c) <%= moment().format('YYYY') %> Wilma <hello@withwilma.com> (https://www.withwilma.com/)
* Released under the MIT License.
*/`,
            }),
        ],
    },
    {
        input: 'src/index.js',
        output: {
            name: 'wilma',
            file: module,
            format: 'esm',
        },
        external: Object.keys(dependencies),
        plugins: [
            strip({
                debugger: true,
                functions: ['console.log', 'console.debug', 'console.error'],
                sourceMap: true,
            }),
            json(),
            babel({
                babelrc: false,
                exclude: 'node_modules/**',
                presets: ['@babel/env'],
            }),
            resolve({
                preferBuiltins: true,
                modules: ['node_modules'],
            }),
            commonjs(),
            terser(),
            license({
                banner: `/*!
* wilma-js v${version}
* (c) <%= moment().format('YYYY') %> Wilma <hello@withwilma.com> (https://www.withwilma.com/)
* Released under the MIT License.
*/`,
            }),
        ],
    },
];
