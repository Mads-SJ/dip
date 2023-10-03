function getPromise() {
    return new Promise(async (resolve, reject) => {
        const response = await fetch("https://www.random.org/integers/?num=1&min=1&max=10&col=1&base=10&format=plain&rnd=new");
        const numberText = await response.text();
        const number = parseInt(numberText);
        if (number > 7) {
            reject("Random number was greater than 7!");
        } else {
            resolve("Random number was less than or equal to 7!")
        }
    });
}

async function main() {
    try {
        const result = await Promise.allSettled([
            getPromise(),
            getPromise(),
            getPromise(),
            getPromise()
        ]);
        // const result = await Promise.any([getPromise(), getPromise(), getPromise(), getPromise()]);
        // const result = await Promise.allSettled([getPromise(), getPromise(), getPromise(), getPromise()]);
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }
}

main();


