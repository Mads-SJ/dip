function getPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // find random number between 0 and 10
            const randomNumber = Math.trunc(Math.random() * 11);
            if (randomNumber === 10) {
                throw new Error("Random number was 10!")
            } else if (randomNumber > 7) {
                reject("Random number was greater than 7!");
            } else {
                resolve("Random number was less than or equal to 7!")
            }
        }, 1000);
    });
}

async function main() {
    try {
        const result = await Promise.all([getPromise(), getPromise(), getPromise(), getPromise()]);
        // const result = await Promise.any([getPromise(), getPromise(), getPromise(), getPromise()]);
        // const result = await Promise.allSettled([getPromise(), getPromise(), getPromise(), getPromise()]);
        console.log(result);
    }
    catch (error) {
        console.log(error);
    }
}

main();


