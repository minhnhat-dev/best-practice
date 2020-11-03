const XLSX = require('xlsx');

function createSheet(wb, sheetName, data) {
  const newSheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, newSheet, sheetName);
}

function createExcelData(sheetNames, jsonArray) {
  const wb = XLSX.utils.book_new();
  for (let i = 0; i < sheetNames.length; i += 1) {
    createSheet(wb, sheetNames[i], jsonArray[i]);
  }

  return XLSX.write(wb, { type: 'buffer' });
}

module.exports = {
  createExcelData,
};
