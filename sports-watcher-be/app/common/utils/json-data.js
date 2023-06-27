const fs = require('fs');
const path = require('path');

const ROOT_PATH = path.dirname(path.dirname(path.dirname(__dirname)));
const DATABASE_PATH = path.join(ROOT_PATH, 'database');

function readJsonData(fileName) {
  const filePath = path.join(DATABASE_PATH, `${fileName}.json`);
  const rawContent = fs.readFileSync(filePath);
  return JSON.parse(rawContent);
}

function writeJsonData(fileName, data) {
  const filePath = path.join(DATABASE_PATH, `${fileName}.json`);
  const content = JSON.stringify(data);
  fs.writeFileSync(filePath, content);
}

module.exports = {
  readJsonData,
  writeJsonData,
};
