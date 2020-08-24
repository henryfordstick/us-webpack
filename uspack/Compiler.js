const { Tapable, SyncHook } = require('tapable');
const Compilation = require('./Compilation');
class Compiler extends Tapable {
  constructor(options) {
    super();
    this.hooks = {
      run: new SyncHook(['compilation']),
    };
    this.modules = [];
    this.options = options;
  }
  run() {
    const onCompiled = (err, compilation) => {};
    this.compile(onCompiled);
  }
  compile(callback) {
    const compilation = this.newCompilation();
    //开始执行编译 触发所有的监听执行
    this.hooks.run.call(compilation);
    const entryMoudle = compilation.buildModule(this.options.entry, true);
    this.modules.push(entryMoudle);
    this.modules.map((_module) => {
      _module.dependencies.map((dependency) => {
        this.modules.push(compilation.buildModule(dependency, false));
      });
    });
    compilation.emitFiles();
  }
  createCompilation() {
    return new Compilation(this);
  }
  newCompilation() {
    return this.createCompilation();
  }
}
module.exports = Compiler;