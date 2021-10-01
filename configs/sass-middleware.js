const fs = require("fs");
const path = require("path");
const sass = require("sass");
// this  function for converting the directory of scss file to a directoory of css file

module.exports = function scssToCss(src, dest) {
  return function (req, res, next) {
    // absolute path for src and destiantion directory.
    const srcDir = path.resolve(src);
    const destDir = path.resolve(dest);

    // console.log(src, dest);
    fs.readdir(srcDir, (err, fileNames) => {
      if (err) {
        console.error(err);
        next();
        return;
      }
      let srcPath = "";
      let destPath = "";
      for (let file of fileNames) {
        srcPath = path.join(srcDir, file);
        if (path.extname(srcPath) == ".scss") {
          destPath = path.join(
            destDir,
            path.basename(file, path.extname(file)) + ".css"
          );
          //   console.log(destPath);
          let data = sass.renderSync({ file: srcPath });
          data = data.css.toString();
          //   console.log(data);
          fs.writeFile(destPath, data, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(destPath, "converted");
          });
        }
      }
    });
    next();
  };
};
