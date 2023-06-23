const { filterText, countWords, sortByAlphabet, getObjValuesSortedByKeys } = require('./index_util')

const initialData = `ab, cb, b65$^ss, cb, b, \n cb&^%*&^ , _, , . ,. , ab`;
const dataFilteredToArray = ['ab', 'cb', 'b65ss', 'cb', 'b', 'cb', 'ab'];
const dataMapped = {
    cb: 3,
    ab: 2,
    b: 1,
    b65ss: 1,
};
const expectedResultArray = [2,1,1,3];

describe('indexing module', () => {
    it('filters not text/number symbols and returns word array', () => {
        expect(filterText(initialData)).toEqual(dataFilteredToArray)
    })
    test('counts words and puts quantity into object', () => {
        expect(countWords(dataFilteredToArray)).toStrictEqual(dataMapped)
    })
    it('should return array of values, sorted by object keys', () => {
        expect(getObjValuesSortedByKeys(dataMapped)).toEqual(expectedResultArray)
    })

    it('returns -1 if a < b',() => {
        expect(sortByAlphabet('a','b')).toBe(-1)
    })
    it('returns 1 if b > a',() => {
        expect(sortByAlphabet('b','a')).toBe(1)
    })
    it('returns 1 if a = a',() => {
        expect(sortByAlphabet('a','a')).toBe(0)
    })
})