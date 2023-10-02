// opgave11.1.js
const userUrl = 'https://jsonplaceholder.typicode.com/users';
// const userUrl = 'https://jsonplaceholder.typicode.com/users/11';
// const userUrl = 'httpz://jsonplaceholder.typicode.com/users';
const userPostsUrl = 'https://jsonplaceholder.typicode.com/posts?userId=2';

async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

/* get(userUrl)
    .then(users => console.log(".then", users))
    .catch(error => console.log(error)); */

async function getUsers() {
    try {
        const users = await get(userUrl);
        console.log("async/await", users);
    } catch (error) {
        console.log(error);
    }
}

getUsers();