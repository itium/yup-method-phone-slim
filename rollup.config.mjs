import pluginTerser from '@rollup/plugin-terser';
import pluginTypescript from "@rollup/plugin-typescript";
import pluginCommonjs from "@rollup/plugin-commonjs";
import pluginNodeResolve from "@rollup/plugin-node-resolve";
import pluginFilesize from "rollup-plugin-filesize";
import pluginAnalyze from "rollup-plugin-analyzer";
import pluginProgress from "rollup-plugin-progress";
import {babel} from "@rollup/plugin-babel";
import * as path from "path";
import {fileURLToPath} from 'url';
import pkg from "./package.json" assert {type: "json"};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleName = 'YupMethodPhone';
const inputFileName = "src/index.ts";
const author = pkg.author;
const banner = `
  /**
   * @license
   * author: ${author}
   * ${moduleName}.js v${pkg.version}
   * Released under the ${pkg.license} license.
   */
`;

// noinspection JSUnusedGlobalSymbols
export default [
  {
    input: inputFileName,
    // external: ["yup"],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    output: [
      {
        name: moduleName,
        file: pkg.browser,
        format: "umd",
        sourcemap: "inline",
        banner,
      },
      {
        name: moduleName,
        file: pkg.browser.replace(".js", ".min.js"),
        format: "iife",
        sourcemap: "inline",
        banner,
        plugins: [pluginTerser()],
      },
    ],
    plugins: [
      pluginProgress(),
      pluginFilesize(),
      pluginAnalyze(),
      pluginTypescript(),
      pluginCommonjs({
        extensions: [".js", ".ts"],
        include: "node_modules/**"
      }),
      babel({
        babelHelpers: "bundled",
        include: ['src/**/*.ts'],
        extensions: ['.js', '.ts' ],
        exclude: './node_modules/**',
        configFile: path.resolve(__dirname, ".babelrc.js"),
      }),
      pluginNodeResolve({
        browser: true,
      }),
    ],
  },

  // ES
  {
    input: inputFileName,
    output: [
      {
        file: pkg.module,
        format: "es",
        sourcemap: "inline",
        banner,
        exports: "named",
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginProgress(),
      pluginFilesize(),
      pluginAnalyze(),
      pluginCommonjs({
        extensions: [".js", ".ts"],
        include: "node_modules/**"
      }),
      babel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, ".babelrc.js"),
      }),
      pluginNodeResolve({
        browser: false,
      }),
      pluginTypescript(),
    ],
  },

  // CommonJS
  {
    input: inputFileName,
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: "inline",
        banner,
        // exports: "default",
      },
    ],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.devDependencies || {}),
    ],
    plugins: [
      pluginProgress(),
      pluginFilesize(),
      pluginAnalyze(),
      pluginCommonjs({
        extensions: [".js", ".ts"],
        include: "node_modules/**"
      }),
      babel({
        babelHelpers: "bundled",
        configFile: path.resolve(__dirname, ".babelrc.js"),
      }),
      pluginNodeResolve({
        browser: false,
      }),
      pluginTypescript(),

    ],
  },
];
