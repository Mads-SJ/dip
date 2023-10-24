const express = require('express');
const app = express();

const host = 'localhost';
const port = 8000;
let personer = [{ navn: "Ole", alder: 19 }, { navn: "Ib", alder: 21 }];

app.use(express.json());

app.get('/personer', (request, response) => {
    response.status(200);
    response.send(personer);
});
app.post('/personer', (request, response) => {
    console.log(request.body);
    personer.push(request.body);
    response.status(201);
    response.send("Added");
});

app.listen(port);

console.log('Lytter på port ' + port + ' ...');