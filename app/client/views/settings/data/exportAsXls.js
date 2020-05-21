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
      if (jsonData[sheetName] && jsonData[sheetName].length > 0) {
        const reference = jsonData[sheetName][0];
        const keys = [];
        Object.keys(reference || {}).forEach((key) => {
          if (Array.isArray(reference[key])) {
            keys.push(key);
          }
        });
        if (keys.length > 0) {
          jsonData[sheetName].forEach((data) => {
            keys.forEach((key) => {
              data[key] = data[key] ? JSON.stringify(data[key]) : '';
            });
          });
        }
        createXlsSheet(wb, sheetName, jsonData[sheetName]);
      }
    });

    return XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  },
};
