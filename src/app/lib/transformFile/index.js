import fs from 'fs';

function transformFile(file, map) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        const keys = Object.keys(map);
        if (!keys) reject();
        else {
          let result = data;
          keys.forEach((key) => {
            result = result.replace(new RegExp(`---${key}---`, 'g'), map[key]);
          });
          resolve(result);
        }
      }
    });
  });
}
export default transformFile;
