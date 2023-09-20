let values = [];
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
            values[i] = Math.trunc(Math.random() * 6) + 1;
        }
    }
    throwCount++;
}

export function getResults() {
    const results = [];
    for (let i = 0; i <= 5; i++) {
        results[i] = sameValuePoints(i + 1);
    }
    results[6] = onePairPoints();
    results[7] = twoPairPoints();
    results[8] = threeSamePoints();
    results[9] = fourSamePoints();
    results[10] = fullHousePoints();
    results[11] = smallStraightPoints();
    results[12] = largeStraightPoints();
    results[13] = chancePoints();
    results[14] = yatzyPoints();

    return results;
}

export function calcCounts() {
    const counts = [0, 0, 0, 0, 0, 0, 0];
    for (let value of values) {
        counts[value] = counts[value] + 1;
    }
    return counts;
}

export function sameValuePoints(value) {
    const counts = calcCounts();
    return counts[value] * value;
}

export function onePairPoints() {
    const pairIndices = getPairIndices();
    const size = pairIndices.length;
    if (size < 1) {
        return 0;
    }
    return pairIndices[size - 1] * 2;
}

export function twoPairPoints() {
    const pairIndices = getPairIndices();
    const size = pairIndices.length;
    if (size < 2) { return 0; }

    return pairIndices[size - 1] * 2 + pairIndices[size - 2] * 2;
}

export function getPairIndices() {
    const counts = calcCounts();
    const pairIndices = [];

    for (let i = 1; i < counts.length; i++) {
        if (counts[i] >= 2) {
            pairIndices.push(i);
        }
    }

    return pairIndices;
}

export function threeSamePoints() {
    return nOfAKindPoints(3);
}

export function fourSamePoints() {
    return nOfAKindPoints(4);
}

export function nOfAKindPoints(n) {
    let points = 0;
    const counts = calcCounts();

    for (let i = 1; i < counts.length; i++) {
        if (counts[i] >= n) {
            points = i * n;
        }
    }
    return points;
}

export function fullHousePoints() {
    const counts = calcCounts();
    let indexOfHighestDouble = 0;
    let indexOfHighestTriple = 0;

    for (let i = 1; i < counts.length; i++) {
        if (counts[i] === 2 && i > indexOfHighestDouble) {
            indexOfHighestDouble = i;
        }
        if (counts[i] === 3 && i > indexOfHighestTriple) {
            indexOfHighestTriple = i;
        }
    }

    let points = 0;
    if (indexOfHighestDouble !== 0 && indexOfHighestTriple !== 0) {
        points = indexOfHighestDouble * 2 + indexOfHighestTriple * 3;
    }

    return points;
}

export function smallStraightPoints() {
    if (!isStraightInInterval(1, 5)) { return 0; }
    return 15;
}

export function largeStraightPoints() {
    if (!isStraightInInterval(2, 6)) { return 0; }
    return 20;
}

// Returns true if there is a straight in the given interval, or else false.
export function isStraightInInterval(start, end) {
    const counts = calcCounts();
    let straight = true;

    let i = start;
    while (i <= end && straight) {
        if (!(counts[i] == 1)) {
            straight = false;
        }
        i++;
    }

    return straight;
}

export function chancePoints() {
    return values.reduce((previous, current) => previous + current, 0);
}

export function yatzyPoints() {
    const counts = calcCounts();
    let points = 0;
    let yatzy = false;

    let i = 1;
    while (i < counts.length && !yatzy) {
        if (counts[i] == 5) {
            points = 50;
            yatzy = true;
        }
        i++;
    }

    return points;
}