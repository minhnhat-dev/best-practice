let stt = 0;
process.stdin
  .on('data', (chunk) => {
    stt += 1;
    console.log(stt);
    console.log('New data available');
    console.log(
      `Chunk read: (${chunk.length}) "${chunk.toString()}"`,
    );
  })
  .on('end', () => process.stdout.write('End of stream'));
