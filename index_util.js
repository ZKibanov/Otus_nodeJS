const filterText = (dataString) => {
    return dataString
        .trim()
        .split(' ')
        .filter(word => word.match(/[A-Za-zА-Яа-я0-9]/))
        .map(word => word.replace(/[^A-Za-zА-Яа-я0-9]/g, ''))
}

const countWords = (wordArray, targetObject = {}) => {
    wordArray.forEach(word => {
        if (targetObject.hasOwnProperty(word)) {
            targetObject[word]++
        } else {
            targetObject[word] = 1
        }
    });
    return targetObject;
}

const sortByAlphabet = (a, b) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

const getObjValuesSortedByKeys = (obj) => {
   return Object.keys(obj)
    .sort(sortByAlphabet)
    .map(word => obj[word]);
}
module.exports = { filterText, countWords, sortByAlphabet, getObjValuesSortedByKeys}  