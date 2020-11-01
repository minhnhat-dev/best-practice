const stream = require('stream');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class ToFileStream extends stream.Writable {
  constructor() {
    super({ objectMode: true });
  }

  _write(chunk, encoding, callback) {
    console.log('chunk.path', chunk.path);
    fs.writeFile(chunk.path, chunk.content, callback);
  }
}
module.exports = ToFileStream;
