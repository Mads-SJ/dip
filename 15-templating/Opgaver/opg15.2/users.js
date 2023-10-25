// expressServer.js
// const express = require('express');
// const app = express();

// app.all('/', (request, response) => {
//     let array = [request.method, request.url];
//     response.send(array);
// });

// app.get('/fil/:navn', (request, response) => {
//     let array = [request.method, request.url, request.params.navn];
//     response.send(array);
// });

// app.listen(8080);

// console.log('Lytter på port 8080 ...');



const express = require('express');
const pug = require('pug');
const path = require('path');

const app = express();
const port = 8084;

// Opret en bruger med nogle egenskaber
const user = {
    username: 'brugernavn123',
    fullName: 'John Doe',
    email: 'john@example.com'
};

const users = [
    {
        username: 'brugernavn123',
        fullName: 'John Doe',
        email: 'john@example.com'
    },
    {
        username: 'jane123',
        fullName: 'Jane Smith',
        email: 'jane@example.com'
    },
    {
        username: 'bob456',
        fullName: 'Bob Johnson',
        email: 'bob@example.com'
    }
];


// Indstil Pug som skabelonmotor
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Definer en route til at sende brugerobjektet til users.pug
app.get('/users', (req, res) => {
    res.render('users', { users });
});

app.listen(port, () => {
    console.log(`Server kører på port ${port}`);
});
