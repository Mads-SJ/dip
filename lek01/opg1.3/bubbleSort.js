// bubbleSort.js
let list = [7, 13, 9, 8, 4, 1, 2, 16, 0];

for (let i = list.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
        if (list[j] > list[j + 1]) {
            let temp = list[j];
            list[j] = list[j+1];
            list[j+1] = temp;
        }
    }
}
console.log(list.toString()); // => 0,1,2,4,7,8,9,13,16


function binarySearch(list, target) {
    let position = -1;
    let left = 0;
    let right = list.length - 1;
    while (position === -1 && left <= right) {
        const middle = Math.floor((left + right) / 2);
        const n = list[middle];

        if (n === target) {
            position = middle;
        } else if (n < target) {
            left = middle + 1;
        } else {
            right = middle - 1;
        }
    }

    return position;
}

console.log(binarySearch(list, 1));
console.log(binarySearch(list, 17));

module.exports = binarySearch;