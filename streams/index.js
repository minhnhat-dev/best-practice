const stream = require('stream');
const faker = require('faker');
const RandomStream = require('./randomStream');

const randomStream = new RandomStream();

// randomStream.on('readable', () => {
//   let chunk;
//   while ((chunk = randomStream.read()) !== null) {
//     console.log(`Chunk received: ${chunk.toString()}`);
//   }
// });

// const ToFileStream = require('./toFileStream.js');

// const tfs = new ToFileStream();

// tfs.write({ path: 'file1.txt', content: 'Hello' });
// tfs.write({ path: 'file2.txt', content: 'Node.js' });
// tfs.write({ path: 'file3.txt', content: 'Streams' });
// tfs.end(() => console.log('All files created'));

const ReplaceStream = require('./transformStream');

const rs = new ReplaceStream('World', 'Node.js');
rs.on('data', chunk => console.log(chunk.toString()));

rs.write('Hello W');
rs.write('orld!');
rs.end();
