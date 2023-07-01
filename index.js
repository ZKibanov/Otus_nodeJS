const {tree} = require('./tree');
const [, , path, opts, _depth] = process.argv;
console.log(tree(path, opts, _depth));