const array = [6, 2, 4, 7, 1, 9];

const max = (array) => {
    let max = null;
    for (number of array) {
        if (max < number) {
            max = number;
        }
    }
    return max;
}

function contains (array, element) {
    // return array.some((e) => e === element);
    // return array.includes(element);

    for (number of array) {
        if (number === element) return true;
    }
    return false;
}

const sum = (array) => array.reduce((accumulator, current) => accumulator + current);

console.log("max: " + max(array));
console.log("contains(3): " + contains(array, 3));
console.log("contains(2): " + contains(array, 2));
console.log("sum: " + sum(array));