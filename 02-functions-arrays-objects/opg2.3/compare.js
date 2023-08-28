function compare(s1, s2) {
    // return string1.localCompare(string2);
    if (s1 < s2) {
        return -1;
    } else if (s1 > s2) {
        return 1;
    } else {
        return 0;
    }
}

function compareLen(s1, s2) {
    if (s1.length < s2.length) {
        return -1;
    } else if (s1.length > s2.length) {
        return 1;
    } else {
        return 0;
    }
}

function compareIgnoreCase(s1, s2) {
    const s1Lower = s1.toLowerCase();
    const s2Lower = s2.toLowerCase();
    return compare(s1Lower, s2Lower);
}


// bubbleSort.js
let list = ["d", "c", "b", "a"];

for (let i = list.length - 1; i >= 0; i--) {
    for (let j = 0; j <= i - 1; j++) {
        if (compare(list[j], list[j + 1]) > 0) {
            swap(j);
        }
    }

    function swap(j) {
        let temp = list[j];
        list[j] = list[j+1];
        list[j+1] = temp;
    }
}
console.log(list.toString()); // => 0,1,2,4,7,8,9,13,16