const binarySearch = require("./bubbleSort");

test('searches array [1, 2, 3] and finds index of 2', () => {
    expect(binarySearch([1, 2, 3], 2)).toBe(1);
});
