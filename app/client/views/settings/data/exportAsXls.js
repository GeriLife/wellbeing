const XLSX = require('xlsx');

const createXlsSheet = (workbook, sheetName, dataArray) => {
  const ws = XLSX.utils.json_to_sheet(dataArray);
  XLSX.utils.book_append_sheet(workbook, ws, sheetName);
};

module.exports = {
  convertToXls(jsonData) {
    const wb = XLSX.utils.book_new();

    const sheets = Object.keys(jsonData);

    sheets.forEach((sheetName) => {
      createXlsSheet(wb, sheetName, jsonData[sheetName]);
    });

    return XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  },
};
