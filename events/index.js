const { EventEmitter } = require('events');
const fs = require('fs');

function findPattern(files, regex) {
  const emitter = new EventEmitter();
  files.forEach((file) => {
    fs.readFile(file, 'utf8', (err, content) => {
      console.log('content', content);
      console.log('content typeof', typeof content);
      if (err) { return emitter.emit('error', err); }

      emitter.emit('fileread', file);
      const match = content.match(regex);
      if (match) {
        match.forEach(elem => emitter.emit('found', file, elem));
      }
    });
  });
  return emitter;
}

const evenEmitter = findPattern(
  ['test_1.json', 'test_2.txt'],
  /nhat\w+/g,
);

evenEmitter
  .on('fileread', file => console.log(`${file} was read`))
  .on('found', (file, match) => console.log(`Matched "${match}" in file ${file}`))
  .on('error', err => console.log(`Error emitted: ${err.message}`));
