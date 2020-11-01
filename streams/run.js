const concatFiles = require('./concatFiles');

console.log('process.argv', process.argv);
concatFiles(process.argv[3], process.argv[2], () => {
  console.log('Files concatenated successfully');
});
