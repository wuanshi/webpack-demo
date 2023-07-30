const path = require("path");
const fs = require("fs");
const CopyWebpackPlugin = require('copy-webpack-plugin')
function getFilesAndFoldersInDir(path) {
    const items = fs.readdirSync(path);
    console.log(fs.readdirSync(path));
    const result = [];
    items.forEach(item => {
        const itemPath = `${path}/${item}`;
        const stat = fs.statSync(itemPath);
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
module.exports = {
    mode: "none",
    entry: () => {
        // return new Promise((resolve) => {
        //   fs.readdir("./js", (err, files) => {
        //     let entryObj = {};
        //     files.forEach((str) => {
        //       entryObj[str.replace(".js", "")] = {
        //         import: `./js/${str}`,
        //         filename: `./js/${str}`,
        //       };
        //     });
        //     console.log(entryObj);
        //     resolve(entryObj);
        //   });
        // });
        return new Promise((resolve, reject) => {
            const targetDir = ['./js']
            let entryObj = {};
            const list = getFilesAndFoldersInDir('./js')
            list.forEach((item) => {
              entryObj[item.name.replace(".js", "")] = {
                import: `./js/${item.name}`,
                filename: `./js/${item.name}`,
              };
            });
            console.log('entry', entryObj);
            resolve(entryObj)
        })
    },
    output: {
        // path动态获取绝对路径
        // path:'./dist',
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                { from: "php", to: "php" },
              ],
        })
    ]
};
