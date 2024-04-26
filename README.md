## Introduction of Speedy Web Compiler (SWC) ✨

SWC is an extensible Rust-based platform for the next generation of fast developer tools. It's used by tools like Next.js, Parcel, and Deno, as well as companies like Vercel, ByteDance, Tencent, Shopify, and more.

SWC can be used for both compilation ( which Babel does ) and bundling (which Webpack does). For compilation, it takes JavaScript / TypeScript files using modern JavaScript features and outputs valid code that is supported by all major browsers.

However, SWC as a bundler is not recommended as a direct replacement of Webpack, because it is still in development.

SWC was able to achieve this such amazing spec because it’s written in Rust, which is also a very popular system language like C or C++. Since its been a system language, it has direct access to hardware and memory making it possible to build extremely fast and memory-efficient applications.

Hence the significant bump in speed over babel which is written in javascript.

## SWC vs Babel

SWC (Speedy Web Compiler) is known for its speed because of its different approach to JavaScript transpilation compared to Babel. Here's why SWC is faster and some potential disadvantages:

### Why SWC is faster:

1. **Rust Language Implementation**: SWC is implemented in Rust, a language known for its performance and memory safety. Rust allows SWC to perform many tasks more efficiently compared to Babel, which is implemented in JavaScript.
2. **Parallel Processing**: SWC can take advantage of parallel processing to transpile multiple files simultaneously, leading to faster overall compilation times.
3. **Optimized Algorithms**: SWC utilizes optimized algorithms for parsing and generating JavaScript code, which further improves its speed.
4. **Less Overhead**: SWC is designed to be a lean and efficient compiler, which means it has less overhead compared to Babel.

### Potential Disadvantages of SWC over Babel:

1. **Community and Ecosystem**: Babel has been around for longer and has a larger community and ecosystem. It has more plugins, presets, and integrations available compared to SWC.
2. **Compatibility**: Babel has broader compatibility with various JavaScript language features, plugins, and presets. While SWC aims to support most modern JavaScript features, it may not cover every edge case or have the same level of compatibility as Babel.
3. **Configuration Complexity**: Babel's configuration options are well-documented and widely understood. SWC's configuration may be less familiar to developers who are used to working with Babel.
4. **Tooling Integration**: Babel is more widely integrated with existing JavaScript tooling and build systems. SWC may require additional setup or integration effort in some cases

## Let's see how SWC as bundler works

#### Create a two sample file

src/logger.js

```js
class Logger {
  static log(message) {
    console.log(message);
  }
}

export default Logger;
```
src/index.js

```js
import Logger from "./logger";

class Application {
  static main() {
    Logger.log("hello");
  }
}

Application.main();
```

### Install SWC core and cli

```bash
$ npm i -D @swc/core @swc/cli 
```

### Compile a file 

```bash
$ npx swc ./src/index.js
```

### Save the output in a seperate output file

```bash
$ npx swc ./src/index.js -o ./output.js
```

### Provide an output directory

```bash
$ npx swc ./src/index.js -d ./dist
```

### You can include all the javascript as entry using CLI

```bash
$ npx swc ./src/*.js -d ./dist
```

### If you want to watch for changes in the file, you can install chokidar dev dependancy

```bash
$ npm i -D chokidar
```

### Watch for changes ( it will thrown an error if you did not install a package )

```bash
$ npx swc ./src/index.js -d ./dist -w
```

### Create a .swcrc file

.swcrc

```json
{
  "minify": true
}
```

Check other configuration in SWC: https://swc.rs/docs/configuration/swcrc

### Again use the above command

```bash
$ npx swc ./src/index.js -d ./dist -w
```

### You can also specify the target here

.swcrc

```json
{
  ...
  "env": {
    "target": "es5"
  }
}
```

## SWC also has bundler knowns spack (This feature is still under construction.)

SWC is able to bundle multiple JavaScript or TypeScript files into one.

This feature is currently named spack, but will be renamed to swcpack in v2. spack.config.js will be deprecated for swcpack.config.js.

Ref: https://swc.rs/docs/configuration/bundling

spack.config.js
```js
const { config } = require("@swc/core/spack");

// If you want auto-completion or type checking for configuration, you can wrap the export with a config function from @swc/core/spack. It's an identity function with type annotation.

module.exports = config({
  entry: {
    web: __dirname + "/src/index.js",
  },
  output: {
    path: __dirname + "/dist",
  },
  options: {
    minify: true,
  },
});
```

Run using
```bash
$ npx spack
```
Note: it will thrown an error if provide a `"type": "module",` in your package.json

The error will look something like this: 
```
spack.config.js is treated as an ES module file as it is a .js file whose nearest parent 
package.json contains "type": "module" which declares all .js files in that package scope as ES modules.

Instead rename spack.config.js to end in .cjs, change the requiring code to use dynamic 
import() which is available in all CommonJS modules, or change "type": "module" to 
"type": "commonjs" in package.json to treat all .js files as CommonJS (using .mjs for all ES modules instead).
```

## SWC Plugins

Ref: https://github.com/swc-project/plugins