const values = [];
let throwCount = 0;

export function getValues() {
    return values;
}

export function setValues(newValues) {
    values = newValues;
}

export function getThrowCount() {
    return throwCount;
}

export function resetThrowCount() {
    throwCount = 0;
}

export function throwDice(holds) {
    for (let i = 0; i < holds.length; i++) {
        if (!holds[i]) {
            values[i] =  Math.trunc(Math.random() * 6) + 1
        }
    }
    throwCount++;
}