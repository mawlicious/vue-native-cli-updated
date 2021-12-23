const fs = require('fs');

function replaceContents(file, replacement, cb) {

    fs.readFileSync(replacement, (err, contents) => {
      if (err) return cb(err);
      fs.writeFileSync(file, contents, cb);
    });
  
  }
  


module.exports = {replaceContents};