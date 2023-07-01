const { tree, recursiveGetFs, drawPath } = require('./tree');

jest.mock('fs', () => ({
    readdirSync: jest.fn((file_name) => {
        switch(file_name){
            case './':
                return []
            case 'folder1':
                return [
                    { name: 'Dir0', isDirectory: ()=>true},
                    { name: 'Dir1', isDirectory: ()=>true },
                ]
            case 'folder2':
                return [
                    { name: 'Dir2', isDirectory: ()=>true},
                    { name: 'Dir3', isDirectory: ()=>true },
                ]
            case 'folder2/Dir3': 
            return [
                { name: 'SecondLevelDir0', isDirectory: ()=>true},
                { name: 'SecondLevelFile1', isDirectory: ()=>false },
            ]
            default:
                return []
        }
    })
}))

describe('listFilesInDirectorySync', () => {
    describe('draw lib test', () => {
        test('not last dir drawed properly', () => {
            expect(drawPath('name', 1, false)).toMatch('├──name');
        });

        test('last dir drawed properly', () => {
            expect(drawPath('name', 1, true)).toMatch('└──name');
        });

        test('nested last dir drawed properly', () => {
            expect(drawPath('name', 2, true)).toMatch('| └──name');
        });

        test('nested not last dir drawed properly', () => {
            expect(drawPath('name', 2, false)).toMatch('| ├──name');
        });
    })

    describe('tree function test', () => {
        test('empty folder log', () => {
            expect(tree('./', '')).toMatch('0 directories 0 files');
        });
        test('empty folder log with parameters', () => {
            expect(tree('', '-d',1)).toMatch('0 directories 0 files');
        });
        test('not empty folder log', () => {
            expect(tree('folder1', '')).toMatch('├──Dir0\n└──Dir1\n\n2 directories 0 files');
        });
        test('depth 2 folder log', () => {
            expect(tree('folder2', '-d', 2)).toMatch('├──Dir2\n└──Dir3\n| ├──SecondLevelDir0\n| └──SecondLevelFile1\n\n3 directories 1 files');
        });
    })

    describe('recursiveGetFs parameters test', () => {
        test('not empty folder returns', () => {
            expect(recursiveGetFs('folder1', 1)).toEqual(['├──Dir0\n└──Dir1\n',2,0]);
        });
        test('no path parametr returns', () => {
            expect(recursiveGetFs()).toEqual(['',0,0]);
        });
    })
})