const express = require('express');
const pug = require('pug');
const path = require('path');

const app = express();
const port = 8083;

const usersURL = 'https://randomuser.me/api/?nat=dk&results=100';

// Indstil Pug som skabelonmotor
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


async function get(url) {
    const respons = await fetch(url);
    if (respons.status !== 200) // OK
        throw new Error(respons.status);
    return await respons.json();
}

app.get('/users', async (req, res) => {
    let users = (await get(usersURL)).results;
    console.log(users);
    res.render('users', { users });
});
app.listen(port, () => {
    console.log(`Server kører på port ${port}`);
});
