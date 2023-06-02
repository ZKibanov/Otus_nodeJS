const [, , path, opts, _depth] = process.argv;
const fs = require('fs');

function drawPath(pathName, depth, isLast) {
    const currentPath = isLast ? `└──${pathName}\n` : `├──${pathName}\n`;
    return '| '.repeat(depth - 1) + currentPath;
}

let initialDepth = 1;
if (opts === '-d' && !isNaN(Number(_depth))) {
    initialDepth = Number(_depth);
}
let fileCount = 0;
let dirCount = 0;
let dirInfo = '';

const recursiveGetFs = (name, depth) => {
    const currentFiles = fs.readdirSync(name, { withFileTypes: true })
    currentFiles.forEach((el, idx) => {
        dirInfo += (drawPath(el.name, depth, idx === currentFiles.length - 1))
        if (el.isDirectory()) {
            dirCount += 1;
            if (depth < initialDepth) {
                recursiveGetFs(`${name}/${el.name}`, depth + 1)
            }
        } else {
            fileCount += 1;
        }
    })
}

recursiveGetFs(path, 1);
console.log(dirInfo)
console.log(`${dirCount} directories ${fileCount} files`)
