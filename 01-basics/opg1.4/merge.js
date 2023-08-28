const l1 = [1, 4, 6, 8, 9];
const l2 = [2, 3, 5, 7, 10];

function merge(list1, list2) {
    const newList = [];
    let i1 = 0;
    let i2 = 0;

    while (i1 < list1.length && i2 < list2.length) {
        const n1 = list1[i1];
        const n2 = list2[i2];
        if (n1 <= n2) {
            newList.push(n1);
            i1++;
        } else {
            newList.push(n2);
            i2++;
        }
    }

    while (i1 < list1.length) {
        newList.push(list1[i1]);
        i1++;
    }

    while (i2 < list2.length) {
        newList.push(list2[i2]);
        i2++;
    }

    return newList;
}

console.log(merge(l1, l2).toString());