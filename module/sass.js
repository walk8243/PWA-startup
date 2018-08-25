/*
 * 外部モジュール
 */
const nodeSass  = require('node-sass'),
      fs    = require('fs');

/*
 * ユーザ定義モジュール
 */
const func  = require('./func');

/*
 * 変数
 */
const sassCond  = new RegExp('.+\\.(sass|scss)'),
      renderingSassCond = new RegExp('^[^\\_].+\\.(sass|scss)');

class Sass {
  constructor(options = {}) {
    this.src  = options.src || './public/css';
    this.dest = options.dest || this.src;
  }

  async getSassFiles(path = this.src) {
    return await func.searchCriteriaFile(path, sassCond);
  }
  async getRenderingSassFiles(path = this.src) {
    return await func.searchCriteriaFile(path, renderingSassCond);
  }

  renderSass(file) {
    if(!fs.statSync(file).isFile()) {
      // パスが存在しない場合 or ファイルでない場合
      throw new ReferenceError('Path doesn\'t exist or isn\'t file.');
    }
    var outputFilename = this.getOutputFilename(file);

    nodeSass.render({
      file: file,
      outputStyle: "compressed",
      outputFile: outputFilename
    }, (err, result) => {
      if(err) throw err;
      fs.writeFile(outputFilename, result.css, err => {
        if(err) throw err;
      });
    });
  }

  render(target = []) {
    if(!Array.isArray(target)) {
      if(typeof target === 'string') {
        target = new Array(target);
      } else {
        // 配列でもファイル単体でもない場合
        throw new TypeError('`target` is neither an array nor a single file.');
      }
    } else if(target.length == 0) {
      // ファイルが指定されなかった場合
      throw new TypeError('`target` is not specified.');
    }

    for (let path of target) {
      if(fs.statSync(path).isFile()) {
        if(path.match(renderingSassCond)) {
          this.renderSass(path);
          return;
        } else {
          // レンダリング対象でない場合
          // throw new Error();
          continue;
        }
      } else {
        // パスが存在しない場合 or ファイルでない場合
        throw new ReferenceError('Path doesn\'t exist or isn\'t file.');
      }
    }
  }

  getOutputFilename(filename) {
    return filename.replace(this.src, this.dest).replace(/\.(sass|scss)/, '.css');
  }
}

module.exports = options => {
  return new Sass(options);
};
