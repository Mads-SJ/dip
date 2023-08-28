const array = [6, 2, 4, 7, 1, 9];

array.max = () => {
    let max = null;
    for (number of array) {
        if (max < number) {
            max = number;
        }
    }
    return max;
}

array.contains = function (element) {
    // return array.some((e) => e === element);
    // return array.includes(element);

    for (number of array) {
        if (number === element) return true;
    }
    return false;
}

array.sum = () => array.reduce((accumulator, current) => accumulator + current);

console.log("max: " + array.max());
console.log("contains(3): " + array.contains(3));
console.log("contains(2): " + array.contains(2));
console.log("sum: " + array.sum());