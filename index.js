const fs = require('fs')

// function readFile() {
//     fs.readdir('./js', (err, files) => {
//         console.log(files);
//     })
// }

// readFile()

function getFilesAndFoldersInDir(path) {
  const items = fs.readdirSync(path);
  console.log('items', items);
  const result = [];
  items.forEach(item => {
    const itemPath = `${path}/${item}`;
    const stat = fs.statSync(itemPath);
    console.log('stat', stat);
    if (stat.isDirectory()) {
      let data = {
        // 文件夹
        type: 'file',
        name: item
      }
      let children = getFilesAndFoldersInDir(itemPath)
      children.forEach(item => {
        result.push({
            ...data,
            name: `${data.name}/${item.name}`
        })
      })
    } else {
      // 文件
      result.push({
        type: 'file',
        name: item
      });
    }
  });
  return result;
}

let list = getFilesAndFoldersInDir('./js')
console.log(list)
