function printPrimes(max) {
    for (let i = 2; i <= max; i++) {
        if (isPrime(i)) {
            console.log(i);
        }
    }
}

function isPrime(n) {
    let isPrime = true;
    let i = 2;
    while (isPrime && i < n) {
        if (n % i === 0) {
            isPrime = false;
        }
        i++;
    }
    return isPrime;
}

printPrimes(1000);