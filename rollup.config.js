import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import css from 'rollup-plugin-css-only';
import { config } from 'dotenv';

const production = !process.env.ROLLUP_WATCH;

function replaceConfig() {
  try {
    const configToReplace = {};
    for (const [key, v] of Object.entries(config().parsed)) {
      configToReplace[`process.env.${key}`] = `'${v}'`;
    }

    return configToReplace;
  } catch (e) {
    console.error(`Error replacing config: ${e}`);
    return;
  }
}

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = require('child_process').spawn(
        'npm',
        ['run', 'start', '--', '--dev'],
        {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true,
        }
      );

      process.on('SIGTERM', toExit);
      process.on('exit', toExit);
    },
  };
}

export default {
  input: 'src/main.ts',
  output: {
    sourcemap: true,
    format: 'iife',
    name: 'app',
    file: 'public/build/bundle.js',
  },
  plugins: [
    svelte({
      preprocess: sveltePreprocess({ sourceMap: !production }),
      compilerOptions: {
        dev: !production,
      },
    }),
    css({ output: 'bundle.css' }),
    resolve({
      browser: true,
      dedupe: ['svelte'],
    }),
    replace({
      include: ['src/**/*.ts', 'src/**/*.svelte'],
      preventAssignment: true,
      values: replaceConfig(),
    }),
    commonjs(),
    typescript({
      moduleResolution: 'node',
      sourceMap: !production,
      inlineSources: !production,
    }),

    !production && serve(),
    !production && livereload('public'),
    production && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
