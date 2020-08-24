const Compiler = require('./Compiler');
const options = require('../uspack.config');
const compiler = new Compiler(options);
const plugins = options.plugins;
for (const plugin of plugins) {
  plugin.apply(compiler);
}
compiler.run();

