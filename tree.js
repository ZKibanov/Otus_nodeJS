const fs = require('fs');

function drawPath(pathName, depth, isLast) {
    const currentPath = isLast ? `└──${pathName}\n` : `├──${pathName}\n`;
    return '| '.repeat(depth - 1) + currentPath;
}

const recursiveGetFs = (
    name = './', 
    depth, 
    initialDepth = 1, 
    dirInfo = '',
    dirCount = 0,
    fileCount = 0
    ) => {
    const currentFiles = fs.readdirSync(name, { withFileTypes: true })
    currentFiles.forEach((el, idx) => {
        dirInfo += (drawPath(el.name, depth, idx === currentFiles.length - 1))
        if (el.isDirectory()) {
            dirCount += 1;
            if (depth < initialDepth) {
                const [_dirInfo, _dirCount, _fileCount] = recursiveGetFs(`${name}/${el.name}`, depth + 1, initialDepth);
                dirInfo += _dirInfo;
                dirCount += _dirCount;
                fileCount += _fileCount;
            }
        } else {
            fileCount += 1;
        }
    })
    return [dirInfo, dirCount, fileCount]
}

function tree(path, opts, _depth) {
    let initialDepth = 1;
    if (opts === '-d' && !isNaN(Number(_depth))) {
        initialDepth = Number(_depth);
    }
    const [dirInfo, dirCount, fileCount] = recursiveGetFs(path, 1, initialDepth);
    return (`${dirInfo}\n${dirCount} directories ${fileCount} files`)
}

module.exports = { tree, recursiveGetFs, drawPath }