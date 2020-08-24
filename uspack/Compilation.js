const { Tapable } = require('tapable');
const path = require('path');
const Parser = require('./Parser');
const fs = require('fs');
class Compilation extends Tapable {
  constructor(compiler) {
    super();
    const { options, modules } = compiler;
    this.options = options;
    this.modules = modules;
  }

  buildModule(fileName, isEntry) {
    let ast = '';
    let absoutPath = '';
    if (!isEntry) {
      absoutPath = path.join(process.cwd(), './src/', fileName);
      ast = Parser.ast(absoutPath);
    } else {
      ast = Parser.ast(fileName);
    }
    const dependencies = Parser.getDependency(ast);
    const transformCode = Parser.transform(ast);
    return {
      fileName,
      dependencies,
      transformCode,
    };
  }
  emitFiles() {
    const outputPath = path.join(
      this.options.output.path,
      this.options.output.filename
    );
    let _modules = '';
    this.modules.map((_module) => {
      _modules += ` '${_module.fileName}': function (module, exports, require) {
        ${_module.transformCode}
      },`;
    });
    const template = `(function (modules) {
        var installedModules = {};
        function __webpack_require__(moduleId) {
          // Check if module is in cache
          if (installedModules[moduleId]) {
            return installedModules[moduleId].exports;
          }
          // module.exports = {};
          //构建一个新的模块化规范 并 将moduleId放入缓存
          var module = (installedModules[moduleId] = {
            exports: {},
          });
          modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
          );
          //小心机
          return module.exports;
        }
        return __webpack_require__('${this.options.entry}');
      })({
       ${_modules}
      });
      `;
    fs.writeFileSync(outputPath, template, 'utf-8');
  }
}
module.exports = Compilation;
