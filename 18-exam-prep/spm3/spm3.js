function gaetTalISyttenTabel() {
    return new Promise((resolve, reject) => {
        const randomDelay = Math.random() * 2000 + 1000;
        setTimeout(() => {
            const randomNumber = Math.trunc(Math.random() * 2000);
            if (randomNumber % 17 === 0) {
                resolve("17 går op i " + randomNumber);
            } else {
                reject("17 går ikke op i " + randomNumber);
            }
        }, randomDelay);
    });
}

// gaetTalISyttenTabel()
//     .then(response => console.log(response))
//     .catch(error => console.log(error));

function proevTreGange() {
    return Promise.any([
        gaetTalISyttenTabel(),
        gaetTalISyttenTabel(),
        gaetTalISyttenTabel(),
    ]);
}

// proevTreGange()
//     .then(response => console.log(response))
//     .catch(error => console.log(error));

function proevNGange(n) {
    const gaet = [];
    for (let i = 0; i < n; i++) {
        gaet.push(gaetTalISyttenTabel());
    }
    return Promise.any(gaet);
}

proevNGange(30)
    .then(response => console.log(response))
    .catch(error => console.log(error));

// eksempler
//callback
function getData(callback) {
    setTimeout(callback("data"), 1000);
}

getData(data => console.log(data));
